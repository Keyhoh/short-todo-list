import fs from 'fs-extra';
import Todo from "./Todo";

const mkdir = () => { if (!fs.existsSync(global.App.dataDir)) fs.mkdirSync(global.App.dataDir); };

export default class Store {
      static async save(todo) {
            mkdir();
            await fs.writeJson(`${global.App.dataDir}/${todo.id}.json`, todo.toJson());
      }

      static find(id) {
            try {
                  return Todo.reconstruct(fs.readJsonSync(`${global.App.dataDir}/${id}.json`));
            } catch (error) {
                  throw 'Cannot find todo';
            }
      }

      static async delete(id){
            if(Store.find(id).discarded){
                  await fs.remove(`${global.App.dataDir}/${id}.json`);
            }else{
                  throw 'Cannot delete todo';
            }
      }
}