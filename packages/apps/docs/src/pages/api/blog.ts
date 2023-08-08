import { menuData } from '@/data/menu.mjs';
import { getInitBlogPosts } from '@/hooks/useBlog/utils';
import { IMenuData } from '@/types/Layout';
import { NextApiRequest, NextApiResponse } from 'next';

const search = async (
  req: NextApiRequest,
  res: NextApiResponse<IMenuData[] | IResponseError>,
): Promise<void> => {
  const { limit = 10, offset = 0 } = req.query as unknown as {
    limit: number;
    offset: number;
  };

  const data = getInitBlogPosts(
    menuData as unknown as IMenuData[],
    offset,
    limit,
  );

  res.json(data);
};

export default search;
