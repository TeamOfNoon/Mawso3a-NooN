var gTopicToTable = [];
var gLoadedTables = {};
var gTableData = {};


function isTableLoaded(tableIndex)
{
    return gLoadedTables[tableIndex] === true;
}

function markTableLoaded(tableIndex, data)
{
    gLoadedTables[tableIndex] = true;
    gTableData[tableIndex] = data;
}


function loadTopicTable(tableIndex, callback)
{alert();
    // Already cached
    if (gLoadedTables[tableIndex])
    {
        callback(gTableData[tableIndex]);
        return;
    }

    var file =
        getAbsPath(
            goOdinHunter.aDatabases[0].strTopicTablePath,
            "topictable_" + tableIndex + ".xml"
        );

    var reader = new XmlReader();

    reader.strFilePath = file;

    var ctx = new HuginContext();

    ctx.reset();

    reader.loadFromFile(ctx, function ()
    {
        if (!reader.bSucc)
        {
            callback(null);
            return;
        }

        gLoadedTables[tableIndex] = true;
        gTableData[tableIndex] = reader.curData;

        callback(reader.curData);
    });

    ctx.resume();
}



function loadTables(tableList, callback)
{
    var remaining = tableList.length;

    if (!remaining)
    {
        callback();
        return;
    }

    function done()
    {
        remaining--;

        if (remaining === 0)
            callback();
    }

    for (var i = 0; i < tableList.length; i++)
    {
        loadTopicTable(tableList[i], done);
    }
}