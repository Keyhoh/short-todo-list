import fs from 'fs-extra';

const mkdir = () => { if (!fs.existsSync(global.App.dataDir)) fs.mkdirSync(global.App.dataDir); }

export default class Store {
      static async save(todo) {
            mkdir();
            await fs.writeJson(`${global.App.dataDir}/${todo.id}.json`, todo.toJson());
      }
}