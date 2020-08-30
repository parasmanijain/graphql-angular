import gql from 'graphql-tag';

export const getGenresQuery = gql`
  {
    genres {
      name
      id
    }
  }
`;

export const getCountriesQuery = gql`
  {
    countries {
      name
      id
    }
  }
`;

export const getLanguagesQuery = gql`
  {
    languages {
      name
      id
    }
  }
`;

export const getMoviesQuery = gql`
  {
    movies {
      name
      id
    }
  }
`;

export const getDirectorsQuery = gql`
  {
    directors {
      name
      id
    }
  }
`;

export const addGenreMutation = gql`
  mutation($name: String!) {
    addGenre(name: $name) {
      name
      id
    }
  }
`;

export const addLanguageMutation = gql`
  mutation($name: String!) {
    addLanguage(name: $name) {
      name
      id
    }
  }
`;

export const addCountryMutation = gql`
  mutation($name: String!) {
    addCountry(name: $name) {
      name
      id
    }
  }
`;

export const addDirectorMutation = gql`
  mutation($name: String!, $countryID: ID!) {
    addDirector(name: $name, countryID: $countryID) {
      name
      id
    }
  }
`;

export const addMovieMutation = gql`
  mutation(
    $name: String!
    $year: String!
    $genreID: ID!
    $languageID: ID!
    $directorID: ID!
  ) {
    addMovie(
      name: $name
      year: $year
      genreID: $genreID
      languageID: $languageID
      directorID: $directorID
    ) {
      name
      id
    }
  }
`;

export const getMovieQuery = gql`
  query($id: ID) {
    movie(id: $id) {
      id
      name
      year
      genre {
        name
      }
      language {
        name
      }
      director {
        id
        name
        country {
          name
        }
        movies {
          name
          year
          id
        }
      }
    }
  }
`;
