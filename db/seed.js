use run_tracker;
db.dropDatabase();

db.runs.insertMany([
    {
        startDate: "20/5/24",
        startTime: 10,
        totalTimeFormatted: 35,
        distance: 5,

    },
    {
        startDate: "19/5/24",
        startTime: 12,
        totalTimeFormatted: 35,
        distance: 10,

    },
    
]);