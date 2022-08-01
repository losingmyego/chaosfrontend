import type { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { owner, type, chainId }: any = req.query;

  if (!owner) {
    res.status(400).json({
      message: 'owner is required'
    })
    return;
  }

  const contracts: any = {
    "1": {
      packAddress: process.env.NEXT_PUBLIC_PACK_CONTRACT_MAINNET,
      songsAddress: process.env.NEXT_PUBLIC_SONGS_CONTRACT_MAINNET,
      baseURL: 'https://eth-mainnet.alchemyapi.io/v2/DWJQCea9guvFXcIsV8GYdwYXerOLIpGs/getNFTs/'
    },
    "4": {
      packAddress: process.env.NEXT_PUBLIC_PACK_CONTRACT_RINKEBY,
      songsAddress: process.env.NEXT_PUBLIC_SONGS_CONTRACT_RINKEBY,
      baseURL: 'https://eth-rinkeby.alchemyapi.io/v2/kYeGR053gpU6p3-Ke-ORbTdVkz1nccrB/getNFTs/'
    }
  };

  let filterContract;

  switch (type) {
    case 'packs':
      filterContract = contracts?.[chainId]?.packAddress;
      break;
    case 'songs':
      filterContract = contracts?.[chainId]?.songsAddress;
      break;
    default:
      filterContract = null;
  }

  if (!filterContract) {
    res.status(400).json({
      message: 'type is required'
    })
    return;
  }

  var config = {
    method: 'get',
    url: `${contracts?.[chainId]?.baseURL}?owner=${owner}&contractAddresses[]=${filterContract}`
  };

  const result = await axios(config);

  res.status(200).json({ results: result.data })
}
