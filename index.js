var SAME = 0, INSERT = 1, DELETE = 2, MODIFY = 3;
function localDiff(a, b, equalFn) {
    var lena = a.length;
    var lenb = b.length;
    var dis = [], step = [];
    for(var i = 0; i <= a.length; i++) {
        dis[i] = [];
        step[i] = [];
        for(var j = 0; j <= b.length; j++) {
                dis[i][j] = 0;
                step[i][j] = SAME;
        }
    }

    
    for (i = 0; i <= lena; i++) {
        dis[i][0] = i;
        step[i][0] = INSERT;
    }
    for (j = 0; j <= lenb; j++) {
        dis[0][j] = j;
        step[0][j] = DELETE;
    }

    for (i = 1; i <= lena; i++) {
        for (j = 1; j <= lenb; j++) {
            var sameStep = equalFn && equalFn(a[i - 1], b[j -1]) || a[i - 1] === b[j -1],
                insertStep = dis[i][j - 1] + 1,
                deleStep = dis[i - 1][j] + 1,
                replaceStep = dis[i -1][j -1] + (sameStep ? 0 : 1);
            dis[i][j] = Math.min(insertStep, deleStep, replaceStep);
            switch(dis[i][j]) {
                case replaceStep:
                    step[i][j] = sameStep ? SAME : MODIFY;
                    break;
                case insertStep:
                    step[i][j] = INSERT;
                    break;
                case deleStep:
                    step[i][j] = DELETE;
                    break;
            }
        }
    }
    var diff = [];
    for( i = lena, j = lenb; i > 0 && j > 0; ) {
        var everyStep  =  step[i][j];
        switch(everyStep) {
            case DELETE:
                i--;
                diff.unshift({
                type: DELETE,
                item: a[i]
                })
                break;
            case INSERT:
                j--;
                diff.unshift({
                    type: INSERT,
                    item: b[j]
                })
                break;
            case MODIFY:
                i--; j--;
                diff.unshift({
                    type: MODIFY,
                    item: b[j]
                })
                break;
            case SAME:
                i--;j--;
                diff.unshift({
                    type: SAME,
                    item: a[i]
                })
                break;
        }
    }
    if(i > 0) {
        while(i--) {
            diff.unshift({
                type: DELETE,
                item: a[i]
            })
        }
    }

    if(j > 0) {
        while(j--) {
            diff.unshift({
                type: INSERT,
                item: b[j]
            })
        }
    }
    return diff;
}
return {
    diff: localDiff,
    type: {
        SAME: SAME,
        MODIFY: MODIFY,
        INSERT: INSERT,
        DELETE: DELETE
    }
};

export default localDiff;