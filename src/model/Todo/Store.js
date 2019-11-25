import fs from 'fs-extra';
import Todo from "./Todo";
import ERROR_CODE from "../ERROR_CODE";
import Operation from '../Operation';

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
                  throw ERROR_CODE.NOT_FOUND_TODO;
            }
      }

      static async delete(id) {
            if (Store.find(id).discarded) {
                  await fs.remove(getFilePath(id));
            } else {
                  throw ERROR_CODE.CANNOT_DELETE_TODO;
            }
      }

      static findAll() {
            return fs.readdirSync(global.App.dataDir)
                  .map(f => fs.readJSONSync(`${global.App.dataDir}/${f}`))
                  .map(Todo.reconstruct);
      }

      static async discardAll() {
            await Promise.all(
                  Store.findAll().filter(todo => todo.checked)
                        .map(todo => {
                              Operation.discard(todo);
                              return todo;
                        })
                        .map(async todo => await Store.save(todo))
            );
      }
}