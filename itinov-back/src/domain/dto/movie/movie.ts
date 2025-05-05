export class MovieDto {
  public id: number;

  public name: string;

  public releaseDate: Date;

  public grade: number;

  public cumulGrade: number;

  public watched?: boolean;

  public favorite?: boolean;

  public userGrade?: number | null;

  constructor(
    { id, name, releaseDate, grade, cumulGrade, watched, favorite, userGrade }:
      {
        id: number,
        name: string,
        releaseDate: Date,
        grade: number,
        cumulGrade: number,
        watched?: boolean
        favorite?: boolean
        userGrade?: number | null
      }
  ) {
    this.id = id;
    this.name = name;
    this.releaseDate = releaseDate;
    this.grade = grade;
    this.cumulGrade = cumulGrade;
    this.watched = watched;
    this.favorite = favorite;
    this.userGrade = userGrade;
  }
}

export type MovieSort = "release_date" | "grade";
