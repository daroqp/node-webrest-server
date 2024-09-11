import { Request, Response } from "express"
import { prisma } from "../../data/postgres-db";

export class TodosController {

	// Dependention Injection here
	constructor(){}

	public getTodos = async(_req: Request, res: Response) => {
		const todos = await prisma.todo.findMany();
		return res.json( todos );
	}

	public getTodoById = async(req: Request, res: Response) => {
		const id = +req.params.id;
		if( isNaN( id ) ) {
			return res.status( 400 ).json({ error: 'ID argument is not a number' });
		}

		const todo = await prisma.todo.findUnique({
			where: {
				id: id,
			}
		});

		( todo )
			? res.json(todo)
			: res.status( 404 ).json({ error: `TODO with id ${id} not found` })
	}

	public createTodo = async(req: Request, res: Response) => {
		const { text } = req.body;
		if( !text ) return res.status(400).json({ error: 'Text property is required' })
		
		const todo = await prisma.todo.create({
			data: { text }
		});

		res.json( todo )
	}

	public updateTodo = async(req: Request, res: Response) => {
		const id = +req.params.id;
		if ( isNaN( id ) ) return res.status( 400 ).json({ error: 'ID argument is not a number' });

		const todo = await prisma.todo.findUnique({
			where: {
				id: id,
			}
		});

		if ( !todo ) return res.status( 404 ).json({ error: `Todo with id ${ id } not found` });

		const { text, completedAt } = req.body;

		const todoUpdated = await prisma.todo.update({
			where: {
				id: id,
			},
			data: {
				text: text,
				completedAt: ( completedAt ) ? new Date( completedAt ) : null,
			}
		})

		res.json( todoUpdated );
	}

	public deleteTodo = async(req: Request, res: Response) => {

		const id = +req.params.id;
		if ( isNaN( id ) ) return res.status( 400 ).json({ error: 'ID argument is not a number' });

		const todo = await prisma.todo.findUnique({
			where: {
				id: id,
			}
		});

		if ( !todo ) return res.status( 404 ).json({ error: `Todo with id ${ id } not found` });

		const todoDeleted = await prisma.todo.delete({
			where: {
				id: id,
			},
		});

		( todoDeleted )
			? res.json( todoDeleted )
			: res.status(404).json({ error: `Todo with id ${ id } not found` });
	}
}
