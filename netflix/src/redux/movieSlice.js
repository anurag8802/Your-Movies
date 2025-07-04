import {createSlice} from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name:"movie",
    initialState:{
        nowPlayingMovies:null,
        popularMovie:null,
        topRatedMovies:null,
        upcomingMovies:null,
        toggle:false,
        trailerMovie:null, 
        open:false,
        id:"",
        selectedMovie:null,
        actionMovies: null,
        horrorMovies: null,
        top10HindiMovies: null,
        thrillerMovies: null,
        crimeMovies: null,
        romanceMovies: null,
        inspirationalMovies: null,
        marvelMovies: null,
        familyMovies: null,
        popularKidMovies: null,
        backgroundTrailer: null,
        dialogTrailer: null,
        backgroundIndex: 0,
    },
    reducers:{
        // actions
        getNowPlayingMovies:(state,action)=>{
            state.nowPlayingMovies = action.payload;
        },
        getPopularMovie:(state,action)=>{
            state.popularMovie = action.payload;
        },
        getTopRatedMovie:(state,action)=>{
            state.topRatedMovies = action.payload;
        },
        getUpcomingMovie:(state,action)=>{
            state.upcomingMovies = action.payload;
        },
        setToggle:(state)=>{
            state.toggle = !state.toggle;
        },
        getTrailerMovie:(state,action)=>{
            state.trailerMovie = action.payload;
        },
        setOpen:(state,action)=>{
            state.open = action.payload;
        },
        getId:(state,action)=>{
            state.id = action.payload;
        },
        setSelectedMovie:(state,action)=>{
            state.selectedMovie = action.payload;
        },
        getActionMovies: (state, action) => {
            state.actionMovies = action.payload;
        },
        getHorrorMovies: (state, action) => {
            state.horrorMovies = action.payload;
        },
        getTop10HindiMovies: (state, action) => {
            state.top10HindiMovies = action.payload;
        },
        getThrillerMovies: (state, action) => {
            state.thrillerMovies = action.payload;
        },
        getCrimeMovies: (state, action) => {
            state.crimeMovies = action.payload;
        },
        getRomanceMovies: (state, action) => {
            state.romanceMovies = action.payload;
        },
        getInspirationalMovies: (state, action) => {
            state.inspirationalMovies = action.payload;
        },
        getMarvelMovies: (state, action) => {
            state.marvelMovies = action.payload;
        },
        getFamilyMovies: (state, action) => {
            state.familyMovies = action.payload;
        },
        getPopularKidMovies: (state, action) => {
            state.popularKidMovies = action.payload;
        },
        setBackgroundTrailer: (state, action) => {
            state.backgroundTrailer = action.payload;
        },
        setDialogTrailer: (state, action) => {
            state.dialogTrailer = action.payload;
        },
        setBackgroundIndex: (state, action) => {
            state.backgroundIndex = action.payload;
        },
    }
});
export const {getNowPlayingMovies, getPopularMovie, getTopRatedMovie, getUpcomingMovie,setToggle,getTrailerMovie,setOpen,getId,setSelectedMovie,
    getActionMovies, getHorrorMovies, getTop10HindiMovies, getThrillerMovies, getCrimeMovies, getRomanceMovies, getInspirationalMovies, getMarvelMovies, getFamilyMovies, getPopularKidMovies,
    setBackgroundTrailer, setDialogTrailer, setBackgroundIndex} = movieSlice.actions;
export default movieSlice.reducer;