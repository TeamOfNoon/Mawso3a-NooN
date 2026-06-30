// HuginContext
function HuginContext() {
    this.aTasks = new Array();
    this.bExecuting = false;
    this.bCallBack = false;
    this.bCallBackReady = false;
    this.nLastTime = 0;
    this.bError = false;
    this.bCancel = false;
    this.strMsg = null;
    this.bPause = false;

    this.reset = function() {
        this.aTasks.length = 0;
        this.bExecuting = false;
        this.bCallBack = false;
        this.bCallBackReady = false;
        this.nLastTime = 0;
        this.bError = false;
        this.bCancel = false;
        this.strMsg = null;
        this.bPause = false;
    }

    this.push = function() {
        var i = 0;
        var ttasks = new Array();
        while (i < context.push.arguments.length) {
            var nLen = ttasks.length;
            ttasks[nLen] = new Object();
            ttasks[nLen].func = context.push.arguments[i];
            ttasks[nLen].owner = context.push.arguments[i + 1];
            i += 2;
            var bSuspend = false;
            if (i < context.push.arguments.length &&
                context.push.arguments[i].constructor.toString().search(/^\nfunction Boolean/) == 0) {
                var bSuspend = context.push.arguments[i];
                ++i;
            }
            ttasks[nLen].bSuspend = bSuspend;
        }
        for (i = ttasks.length - 1; i >= 0; --i)
            context.aTasks[context.aTasks.length] = ttasks[i];
    }

    this.pop = function() {
        if (context.aTasks.length == 0)
            return null;
        var task = context.aTasks[context.aTasks.length - 1];
        context.aTasks.length--;
        return task;
    }

    this.initTime = function() {
        context.nLastTime = (new Date()).getTime();
    }

    this.needBreathe = function() {
        var nCurTime = (new Date()).getTime();
        return nCurTime - context.nLastTime >= 100;
    }

    this.resume = function() {
        if (context.bExecuting) {
            if (context.bCallBack)
                context.bCallBackReady = true;
            return;
        }
        context.bExecuting = true;
        context.bPause = false;
        context.initTime();
        while (true) {
            if (context.bCancel) {
                context.bExecuting = false;
                g_CurState = ECS_CANCELED;
                updateResultView();
                return true;
            }
            var task = context.pop();
            if (task == null) {
                context.bExecuting = false;
                return true;
            }
            context.bCallBack = task.bSuspend;
            task.func(context, task.owner, context.resume);
            if (context.bError) {
                context.bExecuting = false;
                g_CurState = ECS_FATALERROR;
                updateResultView();
                return;
            }
            if (context.bCallBack && !context.bCallBackReady) {
                context.bExecuting = false;
                return;
            }
            context.bCallBack = false;
            context.bCallBackReady = false;
            if (context.bPause) {
                context.bExecuting = false;
                return;
            }
            if (context.needBreathe()) {
                context.bExecuting = false;
                updateResultView();
                setTimeout("context.resume();", 1);
                return;
            }
        }
    }
    this.pause = function() {
        context.bPause = true;
    }
    this.stop = function() {
        context.bCancel = true;
    }
}