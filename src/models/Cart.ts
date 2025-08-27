import type {Book} from "./Book";

export interface Cart {
    id: number;
    books: Book[];
    totalPrice?: number;
}