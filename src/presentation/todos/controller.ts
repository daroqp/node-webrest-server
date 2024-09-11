import { Request, Response } from "express"
import { prisma } from "../../data/postgres-db";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";

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
		const [ error, createTodoDTO ] = CreateTodoDto.create( req.body );

		if( error ) return res.status( 400 ).json({ error });

		const todo = await prisma.todo.create({
			data: createTodoDTO!
		});

		res.json( todo )
	}

	public updateTodo = async(req: Request, res: Response) => {
		const id = +req.params.id;
		const [ error, updateTodoDto ] = UpdateTodoDto.create({ ...req.body, id });

		if( error ) return res.status( 400 ).json({ error });

		const todo = await prisma.todo.findUnique({
			where: { id },
		});

		if ( !todo ) return res.status( 404 ).json({ error: `Todo with id ${ id } not found` });


		const todoUpdated = await prisma.todo.update({
			where: { id },
			data: updateTodoDto!.values
		});

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
			: res.status(404).json({ error: `Todo with id ${ id } not found` })
	}
}
