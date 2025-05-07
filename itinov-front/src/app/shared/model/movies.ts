export type MovieSort = "releaseDate" | "grade";

export interface Movie {
   id: number;
   name: string;
   releaseDate: Date;
   grade: number;
   cumulGrade: number;
   watched?: boolean;
   favorite?: boolean;
   userGrade?: number | null;
}