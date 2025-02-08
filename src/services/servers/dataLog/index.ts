import prismaInstance from '@/libs/prisma'
import { createGetPrimaryData } from './utils'
import { isEmpty, omit } from 'lodash/fp'
import { logUploadSchema } from './validation'
import { getMetadataFromRaw } from '../metadata'
import { saveMetadataValues } from '../metadataValue'

const DataLogService = prismaInstance.dataLog

export const createProcessRawLog =
  (fieldMapper?: { [key: string]: string }) =>
  (raw: Record<string, unknown>) => {
    const primaryUtilityFields = [
      'id',
      'utility_id',
      'amount',
      'source',
      'logged_date',
      'city_id',
      'created_at',
    ]

    return {
      primaryData: createGetPrimaryData(primaryUtilityFields, fieldMapper)(raw),
      rawMetadata: omit(primaryUtilityFields, raw),
    }
  }

type MetadataByUtilityID = {
  id: number
  name: string
}

export const createNewLogFromRawData = async ({
  rawData,
  fieldMapper,
  source = 'upload',
  cachedMetadataByUtilityID = {},
}: {
  rawData: Record<string, unknown>
  fieldMapper?: { [key: string]: string }
  isCreateMetadata?: boolean
  source?: string
  cachedMetadataByUtilityID?: { [key: string]: MetadataByUtilityID[] }
}) => {
  const processRawLog = createProcessRawLog(fieldMapper)
  const { primaryData, rawMetadata } = processRawLog(rawData)

  //validation before process
  const validatedRow = logUploadSchema.parse(primaryData)

  const newLog = await DataLogService.create({
    data: {
      ...validatedRow,
      source,
      raw: JSON.stringify(rawData),
    },
  })
  let metadataOfCurrentLog: MetadataByUtilityID[] | undefined =
    cachedMetadataByUtilityID[validatedRow.utility_id]

  if (!metadataOfCurrentLog) {
    metadataOfCurrentLog = await getMetadataFromRaw(
      validatedRow.utility_id,
      rawMetadata,
      Object.keys(fieldMapper ?? {})
    )
    cachedMetadataByUtilityID[validatedRow.utility_id] = metadataOfCurrentLog
  }

  if (!isEmpty(rawMetadata)) {
    await saveMetadataValues(newLog.id, metadataOfCurrentLog, rawMetadata)
  }

  return newLog
}

export default DataLogService
