export class Todo {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public completed: boolean,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}
