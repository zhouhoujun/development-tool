import * as _ from 'lodash';
import { ITask, IDirLoaderOption, IContextDefine, ITaskOption, ITaskContext, currentOperation, findTaskDefineInDir, taskSourceVal, IEnvOption } from 'development-core';
import { ModuleLoader } from './ModuleLoader';

export class DirLoader extends ModuleLoader {

    constructor(option: ITaskOption, env: IEnvOption) {
        super(option, env);
    }

    loadTasks(context: ITaskContext, def: IContextDefine): Promise<ITask[]> {
        let loader: IDirLoaderOption = this.option.loader;
        if (loader.dir) {
            return context.findTasksInDir(taskSourceVal(loader.dir, context.oper, context.env));
        } else {
            return super.loadTasks(context, def);
        }
    }

    protected getContextDefine(): IContextDefine | Promise<IContextDefine> {
        let loader: IDirLoaderOption = this.option.loader;
        if (!loader.configModule
            && !loader.module && loader.dir) {
            return findTaskDefineInDir(taskSourceVal(loader.dir, currentOperation(this.env), this.env));
        } else {
            return super.getContextDefine();
        }
    }
}
