import prismaInstance from '@/libs/prisma'
import { DataLog } from '@prisma/client'
import { metadataSchema } from './validation'
import MetadataValueService from '../metadataValue'

const MetadataService = prismaInstance.metadata

export type InputMetadata = {
  name: string
  unit?: string
  value?: string | number
}

export const getMetadataByUtility = async (utilityID: number) => {
  const results = await MetadataService.findMany({
    where: { utility_id: utilityID },
  })
  return results
}

export const getMetadataFromRaw = async (
  utilityID: number,
  rawMetadata: Record<string, unknown>,
  ignoredMetadata?: string[]
): Promise<{ id: number; name: string }[]> => {
  const existingMetadata = await getMetadataByUtility(utilityID)
  const availableMetadata = []

  for (const keyName of Object.keys(rawMetadata)) {
    if (ignoredMetadata?.includes(keyName)) {
      continue
    }

    let foundMetadata = existingMetadata.find((data) => data.name === keyName)

    if (!foundMetadata) {
      foundMetadata = await MetadataService.create({
        data: {
          utility_id: utilityID,
          name: keyName,
        },
      })
    }
    availableMetadata.push(foundMetadata)
  }

  return availableMetadata
}

export const saveMetadataFromInput = async (
  dataLog: DataLog,
  metadataList: InputMetadata[]
) => {
  const listUtilityMetadata = await getMetadataByUtility(dataLog.utility_id)

  const results = []

  for (const metadata of metadataList) {
    const validatedMetadata = metadataSchema.parse(metadata)
    let existedMetadata = listUtilityMetadata.find(
      (item) => metadata.name === item.name
    )
    if (!existedMetadata) {
      existedMetadata = await MetadataService.create({
        data: {
          ...validatedMetadata,
          utility_id: dataLog.utility_id,
        },
      })
    }
    const metadataValue = await MetadataValueService.create({
      data: {
        metadata_id: existedMetadata.id,
        log_id: dataLog.id,
        value: metadata.value as string,
      },
    })
    results.push(metadataValue)
  }
}

export default MetadataService
