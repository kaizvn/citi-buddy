import prismaInstance from '@/libs/prisma'

const MetadataValueService = prismaInstance.metadataValue

export const saveMetadataValues = async (
  logID: number,
  metadataList: { id: number; name: string }[],
  rawMetadata: Record<string, unknown>
) => {
  return Promise.all(
    metadataList.map((metadata) =>
      MetadataValueService.create({
        data: {
          metadata_id: metadata.id,
          log_id: logID,
          value: rawMetadata[metadata.name] as string,
        },
        select: {
          id: true,
        },
      })
    )
  )
}

export default MetadataValueService
