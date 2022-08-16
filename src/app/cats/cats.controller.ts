import {Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Query, Res, UseGuards} from '@nestjs/common';
import {CatsService} from './cats.service';
import {Response} from 'express';
import {CreateCatModel} from './class-validator-vibes/cats.validator';
import type {CatsQuery} from './cats.type';
import {AuthGuard} from "@nestjs/passport";


@Controller('cats')
export class CatsController {
    constructor(private catsService: CatsService) {
    }


    @Get()
    getAllCats(@Query() queryParams: CatsQuery) {
        return this.catsService.findAll(queryParams);
    }


    @UseGuards(AuthGuard('local'))
    @Get(':id')
    async getOneCat(@Param('id') id: string, @Res() res: Response) {
        const foundCat = await this.catsService.findOneCat(id);
        if (!foundCat) {
            res
                .status(HttpStatus.NOT_FOUND)
                .send({message: `Cat with ${id} not found`});
        }
        return res.json(foundCat);
    }

    @UseGuards(AuthGuard('local'))
    @Delete(':id')
    async deleteCat(@Param('id') id: string): Promise<void> {
        return this.catsService.deleteOne(id);
    }


    @UseGuards(AuthGuard('local'))
    @Post()
    async createCat(
        @Body()
            CreateCatDto: CreateCatModel,
    ): Promise<string> {
        return this.catsService.createCat(CreateCatDto);
    }


    @UseGuards(AuthGuard('local'))
    @Patch(':id')
    async updateCatById(
        @Param('id') id: string,
        @Body()
            CreateCatDto: CreateCatModel,
    ) {
        return this.catsService.updateOne(id, CreateCatDto);
    }
}
