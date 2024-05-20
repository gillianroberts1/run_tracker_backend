use run_tracker;
db.dropDatabase();

db.runs.insertMany([
    {
        startDate: "20/5/24",
        startTime: 10,
        totalTime: 10,
        formattedTime: 35,
        distance: 5,

    },
    {
        startDate: "19/5/24",
        startTime: 12,
        totalTime: 16,
        formattedTime: 3,
        distance: 10,

    },
    
]);