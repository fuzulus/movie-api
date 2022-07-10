import Month from './VO/Month';
import MovieDirector from './VO/MovieDirector';
import MovieGenre from './VO/MovieGenre';
import MovieId from './VO/MovieId';
import MovieReleaseDate from './VO/MovieReleaseDate';
import MovieTitle from './VO/MovieTitle';
import UserId from './VO/UserId';

export default class Movie {
    public constructor(
        private readonly _id: MovieId,
        private readonly _userId: UserId,
        private readonly _title: MovieTitle,
        private readonly _releaseDate: MovieReleaseDate,
        private readonly _genre: MovieGenre,
        private readonly _director: MovieDirector,
        private readonly _createdInMonth: Month,
    ) {}

    get id(): MovieId {
        return this._id;
    }

    get userId(): UserId {
        return this._userId;
    }

    get title(): MovieTitle {
        return this._title;
    }

    get releaseDate(): MovieReleaseDate {
        return this._releaseDate;
    }

    get genre(): MovieGenre {
        return this._genre;
    }

    get director(): MovieDirector {
        return this._director;
    }

    get createdInMonth(): Month {
        return this._createdInMonth;
    }
}
