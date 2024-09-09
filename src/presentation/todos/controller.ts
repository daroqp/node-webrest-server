import { Request, Response } from "express"

const todos = [
	{ id: 1, text: 'Buy milk', createdAt: new Date() },
	{ id: 2, text: 'Buy bread', createdAt: null },
	{ id: 3, text: 'Buy coffee', createdAt: new Date() },
];

export class TodosController {

	// Dependention Injection here
	constructor(){}

	public getTodos = (_req: Request, res: Response) => {

		res.json(todos)
	}
}
