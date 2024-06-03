import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseURL = "http://localhost:5031/api/";

const initialState = {
  songs: [],
  addSongStatus: "",
  addSongError: "",
  getSongsStatus: "",
  getSongsError: "",
  deleteSongStatus: "",
  deleteSongError: "",
  updateSongStatus: "",
  updateSongError: "",
};

export const songsAdd = createAsyncThunk("songs/songsAdd",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axios.post(baseURL + "songs", formData);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const getSongs = createAsyncThunk("songs/getSongs",
  async (id = null, { rejectWithValue }) => {
    try {
      const response = await axios.get(baseURL + "songs");
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const deleteSong = createAsyncThunk("songs/deleteSong",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(baseURL + "songs/" + id);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

export const updateSong = createAsyncThunk("songs/updateSong",
  async (song, { rejectWithValue }) => {
    try {
      const { _id,title,artist,isComplete, date, uid } = song;

      const response = await axios.put(baseURL + "songs/" + _id, {
        title,
        artist,
        isComplete,
        date,
        uid,
      });
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response?.data);
    }
  }
);

const songSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {},
  extraReducers: (builder)=>{
    builder
    .addCase(songsAdd.pending,(state, action) => {
      return {
        ...state,
        addSongStatus: "pending",
        addSongError: "",
        getSongsStatus: "",
        getSongsError: "",
        deleteSongStatus: "",
        deleteSongError: "",
        updateSongStatus: "",
        updateSongError: "",
      };
    })
    .addCase(songsAdd.fulfilled, (state, action) => {
      // state.songs.push(action.payload);
      return {
        ...state,
         songs: [action.payload, ...state.songs],
        addSongStatus: "success",
        addSongError: "",
        getSongsStatus: "",
        getSongsError: "",
        deleteSongStatus: "",
        deleteSongError: "",
        updateSongStatus: "",
        updateSongError: "",
      };
    })
    .addCase(songsAdd.rejected ,(state, action) => {
      return {
        ...state,
        addSongStatus: "rejected",
        addSongError: action.payload,
        getSongsStatus: "",
        getSongsError: "",
        deleteSongStatus: "",
        deleteSongError: "",
        updateSongStatus: "",
        updateSongError: "", 
      };
    })
    .addCase(getSongs.pending, (state, action) => {
      return {
        ...state,
        addSongStatus: "",
        addSongError: "",
        getSongsStatus: "pending",
        getSongsError: "",
        deleteSongStatus: "",
        deleteSongError: "",
        updateSongStatus: "",
        updateSongError: "",  
      };
    })
    .addCase(getSongs.fulfilled, (state, action) => {
      return {
        ...state,
        songs: action.payload,
        addSongStatus: "",
        addSongError: "",
        getSongsStatus: "success",
        getSongsError: "",
        deleteSongStatus: "",
        deleteSongError: "",
        updateSongStatus: "",
        updateSongError: "",  
        
      };
    })
    .addCase(getSongs.rejected ,(state, action) => {
      return {
        ...state,
        addSongStatus: "",
        addSongError: "",
        getSongsStatus: "rejected",
        getSongsError: action.payload,
        deleteSongStatus: "",
        deleteSongError: "",
        updateSongStatus: "",
        updateSongError: "",
      };
    })
    .addCase(deleteSong.pending,(state, action) => {
      return {
        ...state,
        addSongStatus: "",
        addSongError: "",
        getSongsStatus: "",
        getSongsError:  '',
        deleteSongStatus: "pending",
        deleteSongError: "",
        updateSongStatus: "",
        updateSongError: "", 
        
    };
    })
    .addCase(deleteSong.fulfilled,(state, action) => {
      const currentSongs = state.songs.filter(
        (song) => song._id !== action.payload._id
      );
      return {
        ...state,
        todos: currentSongs,
        addSongStatus: "",
        addSongError: "",
        getSongsStatus: "",
        getSongssError: "",
        deleteSongStatus: "success",
        deleteSongError: "",
        updateSongStatus: "",
        updateSongError: "",
      };
    })
    .addCase(deleteSong.rejected,(state, action) => {
      state = {
        ...state,
        addSongStatus: "",
        addSongError: "",
        getSongsStatus: "",
        getSongsError: "",
        deleteSongStatus: "rejected",
        deleteSongError: action.payload,
        updateSongStatus: "",
        updateSongError: "",
      };
    })
    .addCase(updateSong.pending, (state, action) => {
      return {
        ...state,
        addSongStatus: "",
        addSongError: "",
        getSongsStatus: "",
        getSongssError: "",
        deleteSongStatus: "",
        deleteSongError: "",
        updateSongStatus: "pending",
        updateSongError: "",
      };
    })
    .addCase(updateSong.fulfilled,(state, action) => {
      const updatedSongs = state.songs.map((song) =>
        song._id === action.payload._id ? action.payload : song
      );
      return {
        ...state,
        songs: updatedSongs,
        addSongStatus: "",
        addSongError: "",
        getSongsStatus: "",
        getSongsError: "",
        deleteSongStatus: "",
        deleteSongError: "",
        updateSongStatus: "success",
        updateSongError: "",
      };
  })
    .addCase(updateSong.rejected,(state, action) => {
      return {
        ...state,
        addSongStatus: "",
        addSongError: "",
        getSongsStatus: "",
        getSongsError: "",
        deleteSongStatus: "",
        deleteSongError: "",
        updateSongStatus: "rejected",
        updateSongError: action.payload,
      };
    })
  },
});

export default songSlice.reducer;
