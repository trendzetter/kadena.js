import { fetchManifestData } from './fetchManifestData';
import { getProofOfUs } from './proofOfUs';

const getEventData = async (
  eventId: string,
): Promise<IProofOfUsTokenMeta | undefined> => {
  const event = await getProofOfUs(eventId);
  if (!event) return;
  const data = await fetchManifestData(event?.uri);

  return data;
};

export const createManifest = async (
  proofOfUs: IProofOfUsData,
  url: string,
) => {
  const signees =
    Object.keys(proofOfUs.signees).map((k: any) => proofOfUs.signees[k]) ?? [];

  const eventData = await getEventData(proofOfUs.eventId);

  return {
    name: proofOfUs.title,
    description: `${proofOfUs.title} was a great event`,
    image: url,
    authors: signees.map((signee) => ({
      name: signee.name ? signee.name : signee.alias,
    })),
    properties: {
      date: proofOfUs.date,
      eventName: eventData?.name,
      eventId: proofOfUs.eventId,
      eventType: proofOfUs.type,
      avatar: {
        backgroundColor: proofOfUs.backgroundColor,
      },
      signees: signees?.map((signee) => {
        const links = signee.socialLinks?.length
          ? Object.keys(signee?.socialLinks).map((k: any) => {
              if (!signee?.socialLinks) return undefined;
              return signee?.socialLinks[k];
            })
          : [];
        return {
          name: signee.name ? signee.name : signee.alias,
          accountName: signee.accountName,
          position: {
            xPercentage: signee.position?.xPercentage,
            yPercentage: signee.position?.yPercentage,
          },
          socialLinks: links,
        };
      }),
    },
    collection: {
      name: 'Proof Of Us',
      family: 'Art',
    },
  };
};
