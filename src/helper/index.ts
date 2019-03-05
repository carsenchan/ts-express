let fakeDB:Vote[] = [
  {
    id: 1,
    tags:['global'],
    startDate: '2010/09/01',
    endDate: '2010/10/31'
  },
  {
    id: 2,
    tags: ['cooking', 'global'],
    startDate: '2011/07/01',
    endDate: '2011/08/31'
  },
  {
    id: 3,
    tags: ['local', 'hongkong', 'cooking'],
    startDate: '2019/01/01',
    endDate: '2019/02/28'
  },
];

export interface Vote{  
  id: number,
  tags: string[],
  startDate: string,
  endDate: string
}


const voteServices = {
  get : (id:number): Promise<Vote> => new Promise<Vote>( (resolve, reject)=>{
    setTimeout(()=>{
      resolve(fakeDB[0]);
    }, 2000);
  }),
  getAll: (): Promise<Vote[]> => new Promise<Vote[]>( (resolve, reject)=>{
    setTimeout(()=>{
      resolve(fakeDB);
    }, 2000);
  }),
}



export default voteServices;