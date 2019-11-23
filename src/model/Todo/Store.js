import fs from 'fs-extra';
import Todo from "./Todo";

const mkdir = () => { if (!fs.existsSync(global.App.dataDir)) fs.mkdirSync(global.App.dataDir); };
const getFilePath = id => `${global.App.dataDir}/${id}.json`;

export default class Store {
      static async save(todo) {
            mkdir();
            await fs.writeJson(getFilePath(todo.id), todo.toJson());
      }

      static find(id) {
            try {
                  return Todo.reconstruct(fs.readJsonSync(getFilePath(id)));
            } catch (error) {
                  throw 'Cannot find todo';
            }
      }

      static async delete(id) {
            if (Store.find(id).discarded) {
                  await fs.remove(getFilePath(id));
            } else {
                  throw 'Cannot delete todo';
            }
      }
}