export class Book {
    constructor(
        public id: string,
        public title: string,
        public author: string,
        public price: number,
        public stock: number,
        public publishedYear: number,
        public createdAt: Date,
        public updatedAt: Date
    ) {}
}
