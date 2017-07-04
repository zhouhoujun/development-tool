import { Order, IPipeOption, ICustomPipe, ITaskDefine, ITask, RunWay, TaskString, IOperate, IAssertOption, Src, TaskSource, IDynamicTaskOption, ITaskContext, ITaskConfig } from 'development-core';
export declare type contextFactory = (cfg: ITaskConfig, parent?: ITaskContext) => ITaskContext;
/**
 * task loader option.
 *
 * @export
 * @interface ILoaderOption
 * @extends {IPipeOption}
 */
export interface ILoaderOption extends IPipeOption, ICustomPipe {
    /**
     * loader type, default module.
     *
     * @type {string}
     * @memberOf ILoaderOption
     */
    type?: string;
    /**
     * module name or url
     *
     * @type {string | Object}
     * @memberOf ILoaderOption
     */
    module?: string | Object;
    /**
     * config module name or url.
     *
     * @type {string | Object}
     * @memberOf ILoaderOption
     */
    configModule?: string | Object;
    /**
     * config module name or url.
     *
     * @type {string | Object}
     * @memberOf ILoaderOption
     */
    taskModule?: string | Object;
    /**
     * custom task define
     *
     * @memberOf ILoaderOption
     */
    taskDefine?: ITaskDefine;
}
/**
 * loader to load tasks from directory.
 *
 * @export
 * @interface DirLoaderOption
 * @extends {ILoaderOption}
 */
export interface IDirLoaderOption extends ILoaderOption {
    /**
     * loader dir
     *
     * @type {TaskSource}
     * @memberOf ILoaderOption
     */
    dir?: TaskSource;
    /**
     * config in directory.
     *
     * @type {string}
     * @memberOf DirLoaderOption
     */
    dirConfigFile?: string;
}
/**
 * sub task option.
 *
 * @export
 * @interface ISubTaskOption
 */
export interface ISubTaskOption {
    /**
     * sub tasks.
     *
     * @type {TaskOption}
     * @memberOf ISubTaskOption
     */
    tasks?: TaskOption;
    /**
     * set sub task order in this task sequence.
     *
     * @type {Order}
     * @memberOf ISubTaskOption
     */
    subTaskOrder?: Order;
    /**
     * sub task run way.
     *
     * @type {RunWay}@memberof ISubTaskOption
     */
    subTaskRunWay?: RunWay;
}
/**
 * the option for loader dynamic build task.
 *
 * @export
 * @interface IDynamicLoaderOption
 * @extends {ILoaderOption}
 */
export interface IDynamicLoaderOption extends ILoaderOption {
    /**
     * dynamic task
     *
     * @type {(IDynamicTaskOption | IDynamicTaskOption[])}
     * @memberOf IDynamicLoaderOption
     */
    dynamicTasks?: IDynamicTaskOption | IDynamicTaskOption[];
}
export declare type TaskLoader = (ctx?: ITaskContext) => ITask[] | Promise<ITask[]>;
/**
 * task loader option.
 *
 * @export
 * @interface TaskLoaderOption
 */
export interface ITaskLoaderOption {
    /**
     * task loader
     *
     * @type {(string | TaskLoader | ILoaderOption | IDynamicTaskOption | IDynamicTaskOption[])}
     * @memberOf ITaskLoaderOption
     */
    loader?: string | TaskLoader | ILoaderOption | IDynamicTaskOption | IDynamicTaskOption[];
}
export interface TaskSeq {
    opt: ITaskOption;
    seq: Src[];
}
/**
 * Ref project
 *
 * @export
 * @interface RefProject
 */
export interface RefProject extends IOperate {
    /**
     * project name.
     *
     * @type {TaskString}
     * @memberof RefProjec
     */
    name?: TaskString;
    /**
     * project path
     *
     * @type {TaskString}
     * @memberof RefProjec
     */
    path: TaskString;
    /**
     * cmd for this project.
     *
     * @type {TaskString}
     * @memberof RefProjec
     */
    cmd?: TaskString;
    /**
     * the cmd args.
     *
     * @type {TaskSource}
     * @memberof RefProjec
     */
    args?: TaskSource;
    /**
     * extra args.
     *
     * @type {Src}
     * @memberof RefProject
     */
    extraArgs?: Src;
}
/**
 * ref project.
 *
 * @export
 * @interface RefProject
 */
export interface RefProjects {
    /**
     * refs project, to compile together.
     *
     * @type {(TaskString | RefProjec)[]}
     * @memberof RefProject
     */
    refs?: (TaskString | RefProject)[];
    /**
     * refs project run way.
     *
     * @type {RunWay}
     * @memberof RefProject
     */
    refsRunWay?: RunWay;
    /**
     * refs project run order.
     *
     * @type {Order}
     * @memberof RefProject
     */
    refsOrder?: Order;
}
/**
 * task option setting.
 *
 * @export
 * @interface ITaskOption
 * @extends {IAssertOption}
 * @extends {ISubTaskOption}
 */
export interface ITaskOption extends IAssertOption, ISubTaskOption, ITaskLoaderOption, RefProjects {
}
/**
 * task option.
 */
export declare type TaskOption = ITaskOption | IAssertOption | IDynamicTaskOption | Array<ITaskOption | IAssertOption | IDynamicTaskOption>;
