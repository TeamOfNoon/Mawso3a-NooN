var gTopicToTable = [];
var gTableCount = 0;

function buildTopicLookup(topicMap)
{
    gTopicToTable = [];

    var start = 0;

    for (var table = 0; table < topicMap.length; table++)
    {
        var end = topicMap[table];

        for (var id = start; id < end; id++)
            gTopicToTable[id] = table;

        start = end;
    }
}