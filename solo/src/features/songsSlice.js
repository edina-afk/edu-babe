 // features/songsSlice.js
import { createSlice } from '@reduxjs/toolkit';

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

const songsSlice = createSlice({
  name: "songs",
  initialState,
  reducers: {
    songsAdd: (state) => {
      state.addSongStatus = "pending";
    },
    addSongSuccess: (state, action) => {
      state.songs = [action.payload, ...state.songs];
      state.addSongStatus = "success";
      state.addSongError = "";
    },
    addSongFailure: (state, action) => {
      state.addSongStatus = "rejected";
      state.addSongError = action.payload;
    },
    getSongs: (state) => {
      state.getSongsStatus = "pending";
    },
    fetchSongsSuccess: (state, action) => {
      state.songs = action.payload;
      state.getSongsStatus = "success";
      state.getSongsError = "";
    },
    fetchSongsFailure: (state, action) => {
      state.getSongsStatus = "rejected";
      state.getSongsError = action.payload;
    },
    deleteSong: (state) => {
      state.deleteSongStatus = "pending";
    },
    deleteSongSuccess: (state, action) => {
      state.songs = state.songs.filter(song => song._id !== action.payload._id);
      state.deleteSongStatus = "success";
      state.deleteSongError = "";
    },
    deleteSongFailure: (state, action) => {
      state.deleteSongStatus = "rejected";
      state.deleteSongError = action.payload;
    },
    updateSong: (state) => {
      state.updateSongStatus = "pending";
    },
    updateSongSuccess: (state, action) => {
      state.songs = state.songs.map(song =>
        song._id === action.payload._id ? action.payload : song
      );
      state.updateSongStatus = "success";
      state.updateSongError = "";
    },
    updateSongFailure: (state, action) => {
      state.updateSongStatus = "rejected";
      state.updateSongError = action.payload;
    }
  }
});

export const {
  songsAdd,
  addSongSuccess,
  addSongFailure,
  getSongs,
  fetchSongsSuccess,
  fetchSongsFailure,
  deleteSong,
  deleteSongSuccess,
  deleteSongFailure,
  updateSong,
  updateSongSuccess,
  updateSongFailure
} = songsSlice.actions;

export default songsSlice.reducer;