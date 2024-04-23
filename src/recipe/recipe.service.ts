import { Injectable } from '@nestjs/common';
import { CreateRecipeDto } from './dto/create-recipe.dto';
import { UpdateRecipeDto } from './dto/update-recipe.dto';
import { Repository } from 'typeorm';
import { Recipe } from './entities/recipe.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RecipeService {
  constructor(
    @InjectRepository(Recipe)
    private readonly recipeRepository: Repository<Recipe>,
  ) {}

  createRecipeDate = async () => {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    let yyyy = today.getFullYear();
    return new Date(`${yyyy}-${mm}-${dd}`);
  };

  async create(createRecipeDto: CreateRecipeDto): Promise<Recipe> {
    let recipe = new Recipe();
    recipe.recipe_name = createRecipeDto.recipe_name;
    recipe.ingredients = createRecipeDto.ingredients;
    recipe.instructions = createRecipeDto.instructions;
    recipe.date = await this.createRecipeDate();

    return this.recipeRepository.save(recipe);
  }

  findAll(): Promise<Recipe[]> {
    return this.recipeRepository.find();
  }

  findOne(id: number): Promise<Recipe> {
    return this.recipeRepository.findOne({ where: { id } });
  }

  async update(id: number, updateRecipeDto: UpdateRecipeDto) {
    let recipe = new Recipe();
    recipe.recipe_name = updateRecipeDto.recipe_name;
    recipe.ingredients = updateRecipeDto.ingredients;
    recipe.instructions = updateRecipeDto.instructions;
    recipe.date = await this.createRecipeDate();
    recipe.id = id;
    return this.recipeRepository.save(recipe);
  }

  remove(id: number) {
    return this.recipeRepository.delete(id);
  }
}
