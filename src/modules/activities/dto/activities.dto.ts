import { IsNotEmpty, MinLength } from 'class-validator';


export class ActivityDto {
    @IsNotEmpty()
    @MinLength(4)
    readonly title: string;

    @IsNotEmpty()
    readonly description: string;

    @IsNotEmpty()
    readonly date: string;

    @IsNotEmpty()
    readonly time: string;
}

export class ActivityEditDto {
    readonly title: string;

    readonly description: string;

    readonly date: string;

    readonly time: string;
}