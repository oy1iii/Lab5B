import * as db from '../helpers/database';

//list all the articles in the database
export const getAll = async () => {
 // TODO: use page, limit, order to give pagination
 let query = "SELECT * FROM users;"
 let data = await db.run_query(query, null);
 return data;
}

//get a single article by its id
export const getById = async (id: any) => {
 let query = "SELECT * FROM users WHERE ID = ?"
 let values = [id]
 let data = await db.run_query(query, values);
 return data;
}

//create a new article in the database
export const add = async (user: any) => {
 let keys = Object.keys(user);
 let values = Object.values(user);
 let key = keys.join(',');
 let param = '';
  
 for(let i: number=0; i<values.length; i++){ param +='?,'}
  
 param=param.slice(0,-1);
  
 let query = `INSERT INTO users (${key}) VALUES (${param})`;
  
 try{
   await db.run_insert(query, values);
   return {status: 201};
 } catch(err: any) {
   return err;
 }
}

//update article by id
export const updateById = async (id: any, user: any) => {
 let values = [user.firstname, user.lastname, user.username, user.about, user.email, id]
 let query = `UPDATE users SET firstname = ?, lastname = ?, username = ?, about = ?, email = ? WHERE ID = ?`
 
 try{
   await db.run_update(query, values);
   return {status: 201};
 } catch(err: any) {
   return {status: err};;
 }
}

//update article by id
export const deletById = async (id: any) => {
 let query = "DELETE FROM users WHERE ID = ?"
 let values = [id]

 try{
   let data = await db.run_query(query, values);
   return {status: 201};
 } catch(err: any) {
   return err;
 }
}