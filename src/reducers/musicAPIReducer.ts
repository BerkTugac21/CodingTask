import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

const BASE_URL = "https://itunes.apple.com/search";


interface FetchDataParams {
  term: string;
  entity: string;
  limit: number;
}

interface Artist {
  wrapperType: string;
  artistType: string;
  artistName: string;
  artistLinkUrl: string;
  artistId: number;
  amgArtistId?: number;
  primaryGenreName: string;
  primaryGenreId: number;
}

interface Album {
  amgArtistId: number;
  artistId: number;
  artistName: string;
  artistViewUrl: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionCensoredName: string;
  collectionExplicitness: string;
  collectionId: number;
  collectionName: string;
  collectionPrice: number;
  collectionType: string;
  collectionViewUrl: string;
  contentAdvisoryRating: string;
  copyright: string;
  country: string;
  currency: string;
  primaryGenreName: string;
  releaseDate: string;
  trackCount: number;
  wrapperType: string;
}

interface Song {
  artistId: number;
  artistName: string;
  artistViewUrl: string;
  artworkUrl30: string;
  artworkUrl60: string;
  artworkUrl100: string;
  collectionCensoredName: string;
  collectionExplicitness: string;
  collectionId: number;
  collectionName: string;
  collectionPrice: number;
  collectionViewUrl: string;
  contentAdvisoryRating: string;
  country: string;
  currency: string;
  discCount: number;
  discNumber: number;
  isStreamable: boolean;
  kind: string;
  previewUrl: string;
  primaryGenreName: string;
  releaseDate: string;
  trackCensoredName: string;
  trackCount: number;
  trackExplicitness: string;
  trackId: number;
  trackName: string;
  trackNumber: number;
  trackPrice: number;
  trackTimeMillis: number;
  trackViewUrl: string;
  wrapperType: string;
}



export type SearchResult = Artist & Album & Song;


interface Search {
  resultCount: number;
  results: SearchResult[];
}

const initialState = {
  contents: [] as SearchResult[],
  isLoading: false,
  error: null as string | null | undefined,
}


export const fetchSearch = createAsyncThunk("content/fetchSearch", async (params: FetchDataParams) => {
  const { term, entity, limit } = params;
  const url = new URL(BASE_URL);
  const searchParams = {
    term,
    entity,
    limit: limit.toString()
  };
  url.search = new URLSearchParams(searchParams).toString();
  const response = await fetch(url.toString());
  const data: Search = await response.json();
  return data;
})


export const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setContents: (state, action: PayloadAction<SearchResult[]>) => {
      state.contents = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSearch.pending, (state) => {
      state.isLoading = true;
    })
    builder.addCase(fetchSearch.fulfilled, (state, action) => {
      state.isLoading = false;
      state.contents = action.payload.results;
    })
    builder.addCase(fetchSearch.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error?.message ?? null;
    })
  },
})

export const { setContents } = contentSlice.actions;

export default contentSlice.reducer