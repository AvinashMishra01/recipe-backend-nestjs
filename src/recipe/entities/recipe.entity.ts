import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  recipe_name: string;

  @Column()
  ingredients: string;

  @Column()
  instructions: string;

  @Column()
  date: Date;
}
