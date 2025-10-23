const db=require('../config/db')

const createStore=async(store)=>{
    const {name,code,contact,address,latitude,longitude}=store;
    const [result]=await db.query(
        'insert into stores (name,code,contact,address,latitude,longitude) values(?,?,?,?,?,?)',
        [name,code,contact,address,latitude,longitude]
    )
    return result;
}

//get all stores
const getAllStores=async()=>{
    const [rows]=await db.query('select *from stores')
    return rows;
}


const getNearbyStores = async (latitude, longitude, radiusKm = 5) => {
 const query = `
  SELECT *, 
  (6371 * ACOS(
    COS(RADIANS(?)) * COS(RADIANS(CAST(latitude AS DECIMAL(10,7)))) *
    COS(RADIANS(CAST(longitude AS DECIMAL(10,7))) - RADIANS(?)) +
    SIN(RADIANS(?)) * SIN(RADIANS(CAST(latitude AS DECIMAL(10,7)))))
  ) AS distance_km
  FROM stores
  HAVING distance_km <= 5
  ORDER BY distance_km ASC
`;
  const [rows] = await db.execute(query, [
    latitude,
    longitude,
    latitude,
    radiusKm,
  ]);
  return rows;
};

//get store by id
const getStoreById=async(id)=>{
    const [rows]=await db.query('select *from stores where id=?',[id])
    return rows[0]
}
module.exports={
    createStore,getAllStores,getStoreById,getNearbyStores
}