import fs from 'fs-extra';
import path from 'path';
import Todo from "./Todo";
import ERROR_CODE from "../ERROR_CODE";
import Operation from '../Operation';

const mkdir = () => { if (!fs.existsSync(global.App.dataDir)) fs.mkdirSync(App.dataDir); };
const getFilePath = id => path.resolve(App.dataDir, id + '\.json');

const Store = {
      save: async todo => {
            mkdir();
            await fs.writeJson(getFilePath(todo.id), todo.toJson());
      },

      find: id => {
            try {
                  return Todo.reconstruct(fs.readJsonSync(getFilePath(id)));
            } catch (error) {
                  throw new Error(ERROR_CODE.NOT_FOUND_TODO);
            }
      },

      delete: async id => {
            const error = new Error(ERROR_CODE.CANNOT_DELETE_TODO);
            if (Store.find(id).discarded) {
                  await fs.remove(getFilePath(id));
            } else {
                  throw error;
            }
      },

      deleteAll: async () => {
            await Promise.all(
                  Store.findAll().filter(todo => todo.discarded)
                        .map(async todo => await Store.delete(todo.id))
            );
      },

      findAll: () => {
            return fs.readdirSync(global.App.dataDir)
                  .map(f => fs.readJSONSync(`${global.App.dataDir}/${f}`))
                  .map(Todo.reconstruct);
      },

      discardAll: async () => {
            await Promise.all(
                  Store.findAll().filter(todo => todo.checked)
                        .map(todo => {
                              Operation.discard(todo);
                              return todo;
                        })
                        .map(async todo => await Store.save(todo))
            );
      }
};

export default Store;