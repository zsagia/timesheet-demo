YUI.add('timesheet', function (A, NAME) {

var Lang = A.Lang,
	isArray = Lang.isArray,
	isBoolean = Lang.isBoolean,
	isDate = Lang.isDate,
	isFunction = Lang.isFunction,
	isNumber = Lang.isNumber,
	isString = Lang.isString,

 	DataTypeDate = A.DataType.Date,
	DateMath = A.DataType.DateMath,
	WidgetStdMod = A.WidgetStdMod,

	BASE_WORK_TIME_VALUE = 28800000,

	_DOT = '.',
	_EMPTY_STR = '',
	_SPACE = ' ',

	TIMESHEET = "timesheet",
	TIMESHEET_BASE = "timesheet-base",
	TIMESHEET_DAY = "timesheet-day",
	TIMESHEET_DAYS = "timesheet-days",
	TIMESHEET_VIEW_MONTH = "timesheet-view-month",
	TIMESHEET_VIEW = 'timesheet-view',

	ACTIVE = 'active',
	ACTIVE_VIEW = 'activeView',
	ALL = 'all',
	BASE_WORK_TIME = 'baseWorkTime',
	BTN = 'btn',
	BUTTON = 'button',
	CHEVRON = 'chevron',
	COLGRID = 'colgrid',
	COLUMN = 'column',
	COLUMN_DAY_HEADER = 'columnDayHeader',
	COLUMN_HEADER_NODE = 'columnHeaderNode',
	COLUMN_ELEMENT_HEADER = 'columnElementHeader',
	COLUMN_TABLE_GRID = 'columnTableGrid',
	CONTAINER = 'container',
	CONTENT = 'content',
	CONTROLS = 'controls',
	CONTROLS_NODE = 'controlsNode',
	DATA = 'data',
	DATE = 'date',
	DAY = 'day',
	DISABLED = 'disabled',
	DISPLAY_DAYS_INTERVAL = 'displayDaysInterval',
	DISPLAY_ROWS = 'displayRows',
	DIV = 'div',
	ELEMENT = 'element',
	FIRST = 'first',
	GRID = 'grid',
	HD = 'hd',
	HEADER = 'header',
	HEADER_DATE_FORMATTER = 'headerDateFormatter',
	HEADER_NODE = 'headerNode',
	HEADER_TABLE_NODE = 'headerTableNode',
	HIDDEN = 'hidden',
	ICON = 'icon',
	ICON_NEXT_NODE = 'iconNextNode',
	ICON_PREV_NODE = 'iconPrevNode',
	ICONS = 'icons',
	LEFT = 'left',
	LOCALE = 'locale',
	NAME = 'name',
	NAV = 'nav',
	NAV_NODE = 'navNode',
	NAVIGATION_DATE_FORMATTER = 'navigationDateFormatter',
	NEXT = 'next',
	NEXT_DATE = 'nextDate',
	NOSCROLL = 'noscroll',
	MEETING = 'meeting',
	MONTH = 'month',
	PAST = 'past',
	PREV = 'prev',
	PREV_DATE = 'prevDate',
	RENDERED = 'rendered',
	REMINDER = 'reminder',
	REPEATED = 'repeated',
	RIGHT = 'right',
	ROW = 'row',
	ROWS_CONTAINER_NODE = 'rowsContainerNode',
	SCROLLABLE = 'scrollable',
	SHORT = 'short',
	TABLE = 'table',
	TABLE_GRID_NODE = 'tableGridNode',
	TABLE_ROW_CONTAINER = 'tableRowContainer',
	TABLE_ROWS = 'tableRows',
	TBODY = 'tbody',
	TITLE = 'title',
	TIMESHEET_EVENT = 'TIMESHEET-event',
	TODAY = 'today',
	TODAY_NODE = 'todayNode',
	TODAY_DATE = 'todayDate',
	TR = 'tr',
	TRIGGER_NODE = 'triggerNode',
	VIEW = 'view',
	VIEW_DATE = 'viewDate',
	VIEW_DATE_NODE = 'viewDateNode',
	VIEW_STACK = 'viewStack',
	VIEWS = 'views',
	VIEWS_NODE = 'viewsNode',
	WEEKEND = 'weekend',

	getNodeListHTMLParser = function(selector, sizeCondition) {
		return function(srcNode) {
			var nodes = srcNode.all(selector);
              return (nodes.size() >= sizeCondition) ? nodes : null;
           };
    },

    isModelList = function(val) {
           return val instanceof A.ModelList;
    },

	isTimesheetView = function(val) {
           return val instanceof A.TimesheetView;
    },

	getCN = A.ClassNameManager.getClassName,

    CSS_BTN = getCN(BTN),
	CSS_ICON = getCN(ICON),
    CSS_TIMESHEET_CONTROLS = getCN(TIMESHEET_BASE, CONTROLS),
    CSS_TIMESHEET_HD = getCN(TIMESHEET_BASE, HD),
    CSS_TIMESHEET_ICON_NEXT = getCN(TIMESHEET_BASE, ICON, NEXT),
    CSS_TIMESHEET_ICON_PREV = getCN(TIMESHEET_BASE, ICON, PREV),
    CSS_TIMESHEET_NAV = getCN(TIMESHEET_BASE, NAV),
    CSS_TIMESHEET_TODAY = getCN(TIMESHEET_BASE, TODAY),
    CSS_TIMESHEET_VIEW = getCN(TIMESHEET_BASE, VIEW),
    CSS_TIMESHEET_VIEW_ = getCN(TIMESHEET_BASE, VIEW, _EMPTY_STR),
    CSS_TIMESHEET_VIEW_DATE = getCN(TIMESHEET_BASE, VIEW, DATE),
    CSS_TIMESHEET_VIEW_NOSCROLL = getCN(TIMESHEET_VIEW, NOSCROLL),
    CSS_TIMESHEET_VIEW_SCROLLABLE = getCN(TIMESHEET_VIEW, SCROLLABLE),
    CSS_TIMESHEET_VIEW_SELECTED = getCN(ACTIVE),
    CSS_BTN = getCN(BTN),
    CSS_ICON_CHEVRON_RIGHT = "glyphicon glyphicon-chevron-right",
    CSS_ICON_CHEVRON_LEFT = "glyphicon glyphicon-chevron-left"
    CSS_TIMESHEET_VIEWS = getCN(TIMESHEET_BASE, VIEWS),

    CSS_TIMESHEET_EVENT = getCN(TIMESHEET_EVENT),
    CSS_TIMESHEET_EVENT_ALL_DAY = getCN(TIMESHEET_EVENT, ALL, DAY),
    CSS_TIMESHEET_EVENT_CONTENT = getCN(TIMESHEET_EVENT, CONTENT),
    CSS_TIMESHEET_EVENT_DISABLED = getCN(TIMESHEET_EVENT, DISABLED),
    CSS_TIMESHEET_EVENT_HIDDEN = getCN(TIMESHEET_EVENT, HIDDEN),
    CSS_TIMESHEET_EVENT_ICON_DISABLED = getCN(TIMESHEET_EVENT, ICON, DISABLED),
    CSS_TIMESHEET_EVENT_ICON_MEETING = getCN(TIMESHEET_EVENT, ICON, MEETING),
    CSS_TIMESHEET_EVENT_ICON_REMINDER = getCN(TIMESHEET_EVENT, ICON, REMINDER),
    CSS_TIMESHEET_EVENT_ICON_REPEATED = getCN(TIMESHEET_EVENT, ICON, REPEATED),
    CSS_TIMESHEET_EVENT_ICONS = getCN(TIMESHEET_EVENT, ICONS),
    CSS_TIMESHEET_EVENT_MEETING = getCN(TIMESHEET_EVENT, MEETING),
    CSS_TIMESHEET_EVENT_PAST = getCN(TIMESHEET_EVENT, PAST),
    CSS_TIMESHEET_EVENT_REMINDER = getCN(TIMESHEET_EVENT, REMINDER),
    CSS_TIMESHEET_EVENT_REPEATED = getCN(TIMESHEET_EVENT, REPEATED),
    CSS_TIMESHEET_EVENT_SHORT = getCN(TIMESHEET_EVENT, SHORT),
    CSS_TIMESHEET_EVENT_TITLE = getCN(TIMESHEET_EVENT, TITLE),
	CSS_TVT_COLGRID = getCN(TIMESHEET_VIEW, TABLE, COLGRID),
	CSS_TVT_COLGRID_FIRST = getCN(TIMESHEET_VIEW, TABLE, COLGRID, FIRST),
    CSS_TVT_COLGRID_TODAY = getCN(TIMESHEET_VIEW, TABLE, COLGRID, TODAY),
	CSS_TVT_CONTAINER = getCN(TIMESHEET_VIEW, TABLE, CONTAINER),
	CSS_TVT_HEADER_ELEMENT = getCN(TIMESHEET_VIEW, TABLE, HEADER, ELEMENT),
	CSS_TVT_HEADER_TABLE = getCN(TIMESHEET_VIEW, TABLE, HEADER, TABLE),
	CSS_TVT_HEADER_COLUMN = getCN(TIMESHEET_VIEW, TABLE, HEADER, COLUMN),
	CSS_TVT_ROW = getCN(TIMESHEET_VIEW, TABLE, ROW),
    CSS_TVT_ROW_TODAY = getCN(TIMESHEET_VIEW, TABLE, ROW, TODAY),
    CSS_TVT_ROW_WEEKEND = getCN(TIMESHEET_VIEW, TABLE, ROW, WEEKEND),
	CSS_TVT_ROW_CONTAINER = getCN(TIMESHEET_VIEW, TABLE, ROW, CONTAINER),
    CSS_TVT_TABLE_DATA = getCN(TIMESHEET_VIEW, TABLE, DATA),
    CSS_TVT_TABLE_DATA_COLUMN = getCN(TIMESHEET_VIEW, TABLE, DATA, COLUMN),
    CSS_TVT_TABLE_DATA_FIRST = getCN(TIMESHEET_VIEW, TABLE, DATA, FIRST),
	CSS_TVT_TABLE_GRID = getCN(TIMESHEET_VIEW, TABLE, GRID),
	CSS_TVT_TABLE_GRID_CONTAINER = getCN(TIMESHEET_VIEW, TABLE, GRID, CONTAINER),
	CSS_TVT_TABLE_GRID_FIRST = getCN(TIMESHEET_VIEW, TABLE, GRID, FIRST),

	TPL_TVT_CONTAINER = '<div class="' + CSS_TVT_CONTAINER + '">' +
           '<div class="' + CSS_TVT_ROW_CONTAINER + '"></div>' +
           '</div>',
    TPL_TVT_GRID_COLUMN = '<td class="' + CSS_TVT_COLGRID + '">&nbsp;</td>',
	TPL_TVT_HEADER_ELEMENT = '<th class="' + CSS_TVT_HEADER_ELEMENT + '"><div>&nbsp;</div></th>',
	TPL_TVT_HEADER_TABLE = '<table cellspacing="0" cellpadding="0" class="' + CSS_TVT_HEADER_TABLE + '">' +
           '<tbody>' +
           '<tr class="' + CSS_TVT_HEADER_COLUMN + '"></tr>' +
           '</tbody>' +
           '</table>',
    TPL_TVT_ROW = '<div class="' + CSS_TVT_ROW + '"></div>',
    TPL_TVT_TABLE_DATA = '<table cellspacing="0" cellpadding="0" class="' + CSS_TVT_TABLE_DATA + '">' +
           '<tbody></tbody>' +
           '</table>',
    TPL_TVT_TABLE_DATA_COLUMN = '<td class="' + CSS_TVT_TABLE_DATA_COLUMN + '"><div></div></td>',
    TPL_TVT_TABLE_DATA_ROW = '<tr></tr>',
    TPL_TVT_TABLE_GRID = '<div class="' + CSS_TVT_TABLE_GRID_CONTAINER + '">' +
           '<table cellspacing="0" cellpadding="0" class="' + CSS_TVT_TABLE_GRID + '">' +
           '<tbody>' +
           '<tr></tr>' +
           '</tbody>' +
           '</table></div>',
    TPL_TIMESHEET_CONTROLS = '<div class="span7 ' + CSS_TIMESHEET_CONTROLS + '"></div>',
    TPL_TIMESHEET_HD = '<div class="row-fluid ' + CSS_TIMESHEET_HD + '"></div>',
    TPL_TIMESHEET_ICON_NEXT = '<button type="button" class="' + [CSS_TIMESHEET_ICON_NEXT, "btn btn-default"].join(_SPACE) +
           '"><i class="' + CSS_ICON_CHEVRON_RIGHT + '"></i></button>',
    TPL_TIMESHEET_ICON_PREV = '<button type="button" class="' + [CSS_TIMESHEET_ICON_PREV, "btn btn-default"].join(_SPACE) +
           '"><i class="' + CSS_ICON_CHEVRON_LEFT + '"></i></button>',
    TPL_TIMESHEET_NAV = '<div class="btn-group"></div>',
    TPL_TIMESHEET_TODAY = '<button type="button" class="' + [CSS_TIMESHEET_TODAY, 'btn btn-default'].join(_SPACE) +
           '">{today}</button>',
    TPL_TIMESHEET_VIEW = '<button type="button" class="' + [CSS_TIMESHEET_VIEW, CSS_TIMESHEET_VIEW_, "btn"].join(_SPACE) +
           '{name}" data-view-name="{name}">{label}</button>',
    TPL_TIMESHEET_VIEW_DATE = '<span class="' + CSS_TIMESHEET_VIEW_DATE + '"></span>',
    TPL_TIMESHEET_VIEWS = '<div class="span5 ' + CSS_TIMESHEET_VIEWS + '"></div>';
var TimesheetDay = A.Component.create({
	NAME: TIMESHEET_DAY,

	ATTRS: {
           endDate: {
              validator: isDate
           },

		endTime: {
			validator: isNumber
		},

		lunchTime: {
			validator: isNumber
		},

           startDate: {
              validator: isDate
           },

		startTime: {
			validator: isNumber
		},

		userId: {
              validator: isString
		},

           userName: {
              validator: isString
           }
	},

	EXTENDS: A.Model
});

A.TimesheetDay = TimesheetDay;

A.TimesheetDays = A.Base.create(TIMESHEET_DAYS, A.ModelList, [], {
	model: A.TimesheetDay
}, {
    ATTRS: {
        timesheet: {}
    }
});

var TimesheetDaySupport = function() {};

TimesheetDaySupport.ATTRS = {};

A.mix(TimesheetDaySupport.prototype, {
    dayModel: A.TimesheetDay,

    daysModel: A.TimesheetDays,

    initializer: function(config) {
           var instance = this,
              timesheetDays = instance._toTimesheetDays(config.items || config.timesheetDays);

           instance._timesheetDays = new instance.daysModel({
              after: {
                  add: A.bind(instance._afterAddTimesheetDay, instance)
              },
              bubbleTargets: instance,
              originalItems: [],
              TIMESHEET: instance
           });

           instance._timesheetDaysAsObject = {};
    },

    getTimesheetDays: function(filterFn, skipSort) {
           var instance = this,
              timesheetDays = instance._timesheetDays;

           if (!skipSort) {
              timesheetDays.sort({
                  silent: true
              });
           }

           if (filterFn) {
              timesheetDays = timesheetDays.filter(filterFn);
           }
           else {
              timesheetDays = timesheetDays.toArray();
           }

           return timesheetDays;
    },

    _afterAddTimesheetDay: function(timesheetDay) {
           var instance = this,
              timesheetDaysAsObject = instance._timesheetDaysAsObject,
              startDate, endDate;

           endDate = new Date(timesheetDay.get('endTime'));
           timesheetDay.set('endDate', endDate);

           startDate = new Date(timesheetDay.get('startTime'));
           timesheetDay.set('startDate', startDate);

           timesheetDay.model.set(TIMESHEET, instance);


           timesheetDaysAsObject[startDate.getDate(), startDate];
    },

    _toTimesheetDays: function(values) {
           var instance = this,
              timesheetDays = [];

           if (isModelList(values)) {
              timesheetDays = values.toArray();
              values.set(TIMESHEET, instance);
           }
           else if (isArray(values)) {
              A.Array.each(values, function(value) {
                  if (isModelList(value)) {
                    timesheetDays = timesheetDays.concat(value.toArray());
                    value.set(TIMESHEET, instance);
                  }
                  else {
                    timesheetDays.push(value);
                  }
              });
           }
           else {
              timesheetDays = values;
           }

           return timesheetDays;
    } 
});

A.TimesheetDaySupport = TimesheetDaySupport;

var TimesheetBase =  A.Component.create({
	NAME: TIMESHEET_BASE,

	ATTRS: {
		activeView: {
              validator: isTimesheetView
           },

           controlsNode: {
              valueFn: function() {
                  return A.Node.create(TPL_TIMESHEET_CONTROLS);
              }
           },

           date: {
              value: new Date(),
              validator: isDate
           },

           firstDayOfWeek: {
              value: 0,
              validator: isNumber
           },

           headerNode: {
              valueFn: function() {
                  return A.Node.create(TPL_TIMESHEET_HD);
              }
           },

           iconNextNode: {
              valueFn: function() {
                  return A.Node.create(TPL_TIMESHEET_ICON_NEXT);
              }
           },

           iconPrevNode: {
              valueFn: function() {
                  return A.Node.create(TPL_TIMESHEET_ICON_PREV);
              }
           },

           navigationDateFormatter: {
              value: function(date) {
                  var instance = this;

                  return A.DataType.Date.format(
                    date, {
                        format: '%B %d, %Y',
                        locale: instance.get(LOCALE)
                    }
                  );
              },
              validator: isFunction
           },

           navNode: {
              valueFn: function() {
                  return A.Node.create(TPL_TIMESHEET_NAV);
              }
           },

           strings: {
              value: {
                  day: 'Day',
                  month: 'Month',
                  today: 'Today',
                  week: 'Week',
                  year: 'Year'
              }
           },

           todayDate: {
              value: new Date(),
              validator: isDate
           },

           todayNode: {
              valueFn: function() {
                  return A.Node.create(
                    this._processTemplate(TPL_TIMESHEET_TODAY)
                  );
              }
           },

           viewsNode: {
              valueFn: function() {
                  return A.Node.create(TPL_TIMESHEET_VIEWS);
              }
           },

		viewDate: {
              getter: '_getViewDate',
              readOnly: true
           },

           viewDateNode: {
              valueFn: function() {
                  return A.Node.create(TPL_TIMESHEET_VIEW_DATE);
              }
           },

           views: {
              setter: '_setViews',
              value: []
           }

	},

	HTML_PARSER: {
           controlsNode: _DOT + CSS_TIMESHEET_CONTROLS,
           viewDateNode: _DOT + CSS_TIMESHEET_VIEW_DATE,
           headerNode: _DOT + CSS_TIMESHEET_HD,
           iconNextNode: _DOT + CSS_TIMESHEET_ICON_NEXT,
           iconPrevNode: _DOT + CSS_TIMESHEET_ICON_PREV,
           navNode: _DOT + CSS_TIMESHEET_NAV,
           todayNode: _DOT + CSS_TIMESHEET_TODAY,
           viewsNode: _DOT + CSS_TIMESHEET_VIEWS
    },

    UI_ATTRS: [DATE, ACTIVE_VIEW],

	AUGMENTS: [A.TimesheetDaySupport, A.WidgetStdMod],

	prototype: {
           /**
           * TimesheetBase
           */
		initializer: function() {
                  var instance = this;

                  instance[VIEW_STACK] = {};

                  instance[CONTROLS_NODE] = instance.get(CONTROLS_NODE);
                  instance[VIEW_DATE_NODE] = instance.get(VIEW_DATE_NODE);
                  instance[HEADER] = instance.get(HEADER_NODE);
                  instance[ICON_NEXT_NODE] = instance.get(ICON_NEXT_NODE);
                  instance[ICON_PREV_NODE] = instance.get(ICON_PREV_NODE);
                  instance[NAV_NODE] = instance.get(NAV_NODE);
                  instance[TODAY_NODE] = instance.get(TODAY_NODE);
                  instance[VIEWS_NODE] = instance.get(VIEWS_NODE);

                  instance.after({
                      activeViewChange: instance._afterActiveViewChange,
                      render: instance._afterRender
                  });

                  this.publish({
                      plotViewTimesheetDays: {
                        defaultFn: this._defPlotViewTimesheetDaysFn
                      }
                  });
               },

           /**
           * TimesheetBase
           */
           bindUI: function() {
              var instance = this;

              instance._bindDelegate();
           },

           /**
           * TimesheetBase
           */
           plotViewTimesheetDays: function(view) {
              var instance = this;

              view.plotTimesheetDays(
                  instance.getTimesheetDays()
              );
           },

           /**
           * TimesheetBase
           */
           renderButtonGroup: function() {
              var instance = this;

              instance.buttonGroup = new A.ButtonGroup({
                  boundingBox: instance[VIEWS_NODE],
                  on: {
                    selectionChange: A.bind(instance._onButtonGroupSelectionChange, instance)
                  }
              }).render();
           },

           /**
           * TimesheetBase
           */
           renderView: function(view) {
              var instance = this;

              if (view) {
                  view.show();

                  if (!view.get(RENDERED)) {
                    if (!instance.bodyNode) {
                        instance.setStdModContent(WidgetStdMod.BODY, _EMPTY_STR);
                    }

                    view.render(instance.bodyNode);
                  }
              }
           },

           /**
           * TimesheetBase
           */
           syncTimesheetDaysUI: function() {
              var instance = this,
                  activeView = instance.get(ACTIVE_VIEW);

              if (activeView) {
                  this.fire('plotViewTimesheetDays');
              }
           },

           /**
           * TimesheetBase
           */
           syncStdContent: function() {
              var instance = this;
              var views = instance.get(VIEWS);

              instance[NAV_NODE].append(instance[ICON_PREV_NODE]);
              instance[NAV_NODE].append(instance[ICON_NEXT_NODE]);

              instance[CONTROLS_NODE].append(instance[TODAY_NODE]);
              instance[CONTROLS_NODE].append(instance[NAV_NODE]);
              instance[CONTROLS_NODE].append(instance[VIEW_DATE_NODE]);

              A.Array.each(views, function(view) {
                  instance[VIEWS_NODE].append(instance._createViewTriggerNode(view));
              });

              instance[HEADER].append(instance[CONTROLS_NODE]);
              instance[HEADER].append(instance[VIEWS_NODE]);

              instance.setStdModContent(WidgetStdMod.HEADER, instance[HEADER].getDOM());
           },

           /**
           * TimesheetBase
           */
           syncUI: function() {
              var instance = this;

              instance.syncStdContent();
           },

           /**
           * TimesheetBase
           */
           _afterActiveViewChange: function(event) {
              var instance = this;

              if (instance.get(RENDERED)) {
                  var activeView = event.newVal;
                  var lastActiveView = event.prevVal;

                  if (lastActiveView) {
                    lastActiveView.hide();
                  }

                  instance.renderView(activeView);

                  var eventRecorder = instance.get(EVENT_RECORDER);

                  if (eventRecorder) {
                    eventRecorder.hidePopover();
                  }

                  instance._uiSetDate(instance.get(DATE));
              }
           },

           /**
           * TimesheetBase
           */
           _afterRender: function(event) {
              var instance = this,
                  activeView = instance.get(ACTIVE_VIEW);

              instance.renderView(activeView);
              instance.renderButtonGroup();

              instance._uiSetDate(instance.get(DATE));
              instance._uiSetActiveView(activeView);
           },

           /**
           * TimesheetBase
           */
           _bindDelegate: function() {
              var instance = this;

              instance[CONTROLS_NODE].delegate('click', instance._onClickPrevIcon, _DOT + CSS_TIMESHEET_ICON_PREV,
                  instance);
              instance[CONTROLS_NODE].delegate('click', instance._onClickNextIcon, _DOT + CSS_TIMESHEET_ICON_NEXT,
                  instance);
              instance[CONTROLS_NODE].delegate('click', instance._onClickToday, _DOT + CSS_TIMESHEET_TODAY, instance);
           },

           /**
           * TimesheetBase
           */
           _createViewTriggerNode: function(view) {
              var instance = this;

              if (!view.get(TRIGGER_NODE)) {
                  var name = view.get(NAME);

                  view.set(
                    TRIGGER_NODE,
                    A.Node.create(
                        Lang.sub(TPL_TIMESHEET_VIEW, {
                             name: name,
                             label: (instance.getString(name) || name)
                        })
                    )
                  );
              }

              return view.get(TRIGGER_NODE);
           },

           // TimesheetBase
           _defPlotViewTimesheetDaysFn: function() {
              this.plotViewTimesheetDays(this.get('activeView'));
           },

           // TimesheetBase
		_getViewDate: function() {
              var instance = this,
                  date = instance.get(DATE),
                  activeView = instance.get(ACTIVE_VIEW);


              return date;
           },

           // TimesheetBase
           _onButtonGroupSelectionChange: function(event) {
              var instance = this,
                  viewName = event.originEvent.target.attr(DATA_VIEW_NAME);

              //instance.set(ACTIVE_VIEW, instance.getViewByName(viewName));

              event.preventDefault();
           },

           // TimesheetBase
           _onClickToday: function(event) {
              var instance = this,
                  activeView = instance.get(ACTIVE_VIEW);


              event.preventDefault();
           },

           // TimesheetBase
           _onClickNextIcon: function(event) {
              var instance = this,
                  activeView = instance.get(ACTIVE_VIEW);

              if (activeView) {
                  instance.set(DATE, activeView.get(NEXT_DATE));
              }

              event.preventDefault();
           },

           // TimesheetBase
           _onClickPrevIcon: function(event) {
              var instance = this,
                  activeView = instance.get(ACTIVE_VIEW);

              if (activeView) {
                  instance.set(DATE, activeView.get(PREV_DATE));
              }

              event.preventDefault();
           },

           // TimesheetBase
           _processTemplate: function(tpl) {
              var instance = this;

              return Lang.sub(tpl, instance.getStrings());
           },

           // TimesheetBase
           _setViews: function(val) {
              var instance = this;
              var views = [];

              A.Array.each(val, function(view) {
                  if (isTimesheetView(view) && !view.get(RENDERED)) {
                    view.setAttrs({
                        timesheet: instance
                    });

                    views.push(view);

                    instance[VIEW_STACK][view.get(NAME)] = view;
                  }
              });

              if (!instance.get(ACTIVE_VIEW)) {
                  instance.set(ACTIVE_VIEW, val[0]);
              }

              return views;
           },

           // TimesheetBase
           _uiSetActiveView: function(val) {
              var instance = this;

              if (val) {
                  var activeView = val.get(NAME),
                    activeNav = instance[VIEWS_NODE].one(_DOT + CSS_TIMESHEET_VIEW_ + activeView);

                  if (activeNav) {
                    instance[VIEWS_NODE].all(BUTTON).removeClass(CSS_TIMESHEET_VIEW_SELECTED);
                    activeNav.addClass(CSS_TIMESHEET_VIEW_SELECTED);
                  }
              }
           },

           // TimesheetBase
           _uiSetDate: function(val) {
              var instance = this;

              var formatter = instance.get(NAVIGATION_DATE_FORMATTER);
              var navigationTitle = formatter.call(instance, val);

              if (instance.get(RENDERED)) {
                  var activeView = instance.get(ACTIVE_VIEW);

                  if (activeView) {
                    activeView._uiSetDate(val);

                    formatter = activeView.get(NAVIGATION_DATE_FORMATTER);
                    navigationTitle = formatter.call(activeView, val);
                  }

                  instance[VIEW_DATE_NODE].html(navigationTitle);

                  instance.syncTimesheetDaysUI();
              }
           }
	}

});

A.Timesheet = TimesheetBase;

var TimesheetView = A.Component.create({
	NAME: TIMESHEET_VIEW,

	ATTRS: {
		bodyContent: {
              value: _EMPTY_STR
           },

           height: {
            	value: 1000
    	},

    	name: {
    		value: _EMPTY_STR,
    		validator: isString
    	},

    	navigationDateFormatter: {
              value: function(date) {
                  var instance = this;
                  var timesheet = instance.get(TIMESHEET);

                  return A.DataType.Date.format(date, {
                    format: '%A, %d %B, %Y',
                    locale: timesheet.get(LOCALE)
                  });
              },
              validator: isFunction
           },

           nextDate: {
              getter: 'getNextDate',
              readOnly: true
           },

		prevDate: {
			getter: 'getPrevDate',
           	readOnly: true
           },

           scrollable: {
              value: true,
              validator: isBoolean
           },

           timesheet: {
           	lazyAdd: false,
           	setter: '_setTimesheet'
    	},
	},

    AUGMENTS: [A.WidgetStdMod],

	BIND_UI_ATTRS: [SCROLLABLE],

	prototype: {
           // TimesheetView
		initializer: function() {
              var instance = this;

              instance.after('render', instance._afterRender);
           },

           // TimesheetView
           syncUI: function() {
              var instance = this;

              instance.syncStdContent();
           },

           // TimesheetView
           flushViewCache: function() {},

           // TimesheetView
		getNextDate: function() {},

           // TimesheetView
		getPrevDate: function() {},

           // TimesheetView
		getToday: function() {
             	return DateMath.clearTime(new Date());
           },

           // TimesheetView
           syncStdContent: function() {},

           // TimesheetView
           syncEventUI: function(timesheetDay) {},

           // TimesheetView
           _afterRender: function(event) {
              var instance = this;

              instance._uiSetScrollable(
                  instance.get(SCROLLABLE)
              );
           },

           // TimesheetView
           _uiSetDate: function(val) {},

           // TimesheetView
           _uiSetScrollable: function(val) {
              var instance = this;
              var bodyNode = instance.bodyNode;

              if (bodyNode) {
                  bodyNode.toggleClass(CSS_TIMESHEET_VIEW_SCROLLABLE, val);
                  bodyNode.toggleClass(CSS_TIMESHEET_VIEW_NOSCROLL, !val);
              }
           },

           // TimesheetView
           _setTimesheet: function(timesheet) {
              var instance = this;
              var oldTimesheet = instance.get(TIMESHEET);

              if (oldTimesheet) {
                  instance.removeTarget(oldTimesheet);
              }

              if (timesheet) {
                  instance.addTarget(timesheet);

                  timesheet.after(['*:add', '*:remove', '*:reset'], A.bind(instance.flushViewCache, instance));
              }

              return timesheet;
           }
	}
});
		rowDateFormatter: {
			value: function(date) {
				var instance = this;
				var timesheet = instance.get(TIMESHEET);

				return A.DataType.Date.format(
					date, {
						format: '%X',
						locale: timesheet.get(LOCALE)
					}
				);
			},
			validator: isString
		},

A.TimesheetView = TimesheetView;

		hourMinutesFormatter: {
			value: function(date) {
				var instance = this;
				var timesheet = instance.get(TIMESHEET);

				return A.DataType.Date.format(
					date, {
						format: '%Ih:%Mm',
						locale: timesheet.get(LOCALE)
					}
				);
			},
			validator: isString
		},

    ATTRS: {
    	bodyContent: {
            value: _EMPTY_STR
        },

        name: {
            value: MONTH
        },

        columnHeaderNode: {
            valueFn: '_valueColumnHeaderNode'
        },

        headerElements: {
       	    value: [],
		  validator: isArray
        },

        headerDateFormatter: {
         	value: function(date) {
                var instance = this;
                var timesheet = instance.get(TIMESHEET);

                return A.DataType.Date.format(
                    date, {
                        format: '%d. %A',
                        locale: timesheet.get(LOCALE)
                    }
                );
            },
            validator: isString
        },

        headerTableNode: {
            valueFn: function() {
                return A.Node.create(TPL_TVT_HEADER_TABLE);
            }
        },

        navigationDateFormatter: {
            value: function(date) {
                var instance = this;
                var timesheet = instance.get(TIMESHEET);

                return DataTypeDate.format(
                    date, {
                        format: '%B %Y',
                        locale: timesheet.get(LOCALE)
                    }
                );
            },
            validator: isFunction
        },

       rowsContainerNode: {
          valueFn: function() {
              return A.Node.create(TPL_TVT_CONTAINER);
          }
       },

       scrollable: {
          value: false
       },

       strings: {
          value: {
              close: 'Close',
              show: 'Show',
              more: 'more'
          }
       },

       today: {
          value: new Date()
       }
    },

    HTML_PARSER: {
           headerElements: getNodeListHTMLParser(_DOT + CSS_TVT_HEADER_COLUMN, 7),
           headerTableNode: _DOT + CSS_TVT_HEADER_TABLE,
           rowsContainerNode: _DOT + CSS_TVT_CONTAINER
    },

    EXTENDS: A.TimesheetView,

    prototype: {
    	timesheetDayDateStack: null,
        timesheetDayRenderedStack: null,
        rowDataTableStack: null,

        // TimesheetMonthView
        initializer: function() {
            var instance = this;

            instance.timesheetDayDateStack = {};
            instance.timesheetDayRenderedStack = {};
            instance.rowDataTableStack = {};

    		instance[COLUMN_HEADER_NODE] = instance.get(COLUMN_HEADER_NODE);
    		instance[HEADER_TABLE_NODE] = instance.get(HEADER_TABLE_NODE);
    		instance[ROWS_CONTAINER_NODE] = instance.get(ROWS_CONTAINER_NODE);
    		instance[COLUMN_ELEMENT_HEADER] = instance.headerTableNode.one(_DOT + CSS_TVT_HEADER_COLUMN);
    		instance[COLUMN_TABLE_GRID] = A.NodeList.create();
    		instance[TABLE_ROW_CONTAINER] = instance[ROWS_CONTAINER_NODE].one(_DOT + CSS_TVT_ROW_CONTAINER);
        },

        // TimesheetMonthView
        renderUI: function() {
            var instance = this;

            instance[COLUMN_HEADER_NODE].appendTo(instance[COLUMN_ELEMENT_HEADER]);
       },

       // This is not necesseraly
       // TimesheetMonthView
       buildEventsRow: function(rowStartDate, rowEndDate) {
        var instance = this;
            var displayRows = instance.get(DISPLAY_ROWS);

              var rowRenderedColumns = 0;
              //var rowNode = A.Node.create(TPL_TVT_TABLE_DATA_ROW);

              var timesheet = instance.get('timesheet');

              var timesheetDaysAsObject = timesheet._timesheetDaysAsObject;

              instance.loopDates(rowStartDate, rowEndDate, function(celDate, index) {
              var timesheetDay = timesheetDaysAsObject[rowStartDate.getDate()];

              //instance._syncTimesheetDayNodeUI(timesheetDay, timesheetDayColNode, celDate);

              rowRenderedColumns++;
          });

          return rowNode;
       },

       // This is not necesseraly
       // TimesheetMonthView
       buildEventsTable: function(rowStartDate, rowEndDate) {
          var instance = this,
              intervalStartDate = DateMath.clearTime(instance._findCurrentIntervalStart()),
              cacheKey = String(intervalStartDate.getTime()).concat(rowStartDate.getTime()).concat(rowEndDate.getTime()),
              rowDataTableNode = instance.rowDataTableStack[cacheKey];

          if (!rowDataTableNode) {
              rowDataTableNode = A.Node.create(TPL_TVT_TABLE_DATA);

              var tableBody = rowDataTableNode.one(TBODY);

              instance.rowDataTableStack[cacheKey] = rowDataTableNode;
          }

          return rowDataTableNode;
       },

       // TimesheetMonthView
       buildGridRowNode: function(celDate, index) {
            var instance = this;

            var tableGridNode = instance._getTableGridNode(celDate, index);

            var rowNode = A.Node.create(TPL_TVT_ROW);

            rowNode.append(tableGridNode);

            return rowNode;
       },

       // TimesheetMonthView
        getAdjustedViewDate: function(val) {
            var instance = this;

          return DateMath.toMidnight(DateMath.findMonthStart(val));
        },

        // TimesheetMonthView
        getNextDate: function() {
            var instance = this;

            var timesheet = instance.get(TIMESHEET);
            var viewDate = timesheet.get(VIEW_DATE);

            return DateMath.toLastHour(DateMath.add(viewDate, DateMath.MONTH, 1));
        },

        // TimesheetMonthView
        getPrevDate: function() {
            var instance = this;

            var timesheet = instance.get(TIMESHEET);
            var viewDate = timesheet.get(VIEW_DATE);

            return DateMath.toMidnight(DateMath.subtract(viewDate, DateMath.MONTH, 1));
        },

        // TimesheetMonthView
        plotTimesheetDays: function() {
          var instance = this;

          A.TimesheetMonthView.superclass.plotTimesheetDays.apply(instance, arguments);

          var timesheet = instance.get(TIMESHEET);
          var viewDate = timesheet.get(VIEW_DATE);

          var monthEnd = DateMath.findMonthEnd(viewDate);
          var monthStart = DateMath.findMonthStart(viewDate);

          var currentIntervalStart = instance._findCurrentIntervalStart();
        },

        // TimesheetMonthView
        getRowsNumber: function() {
          var instance = this,
              intervalStartDate = instance._findCurrentIntervalStart(),
              startDateRef = DateMath.safeClearTime(intervalStartDate),
              rowEndDate = DateMath.safeClearTime(DateMath.findMonthEnd(startDateRef));

          return rowEndDate.getDate();
        },

        // TimesheetMonthView
        loopDates: function(startDate, endDate, fn) {
          var instance = this;
          var curDate = DateMath.clone(startDate);
          var endDateMs = endDate.getTime();
          var index;

          for (index = 0; curDate.getTime() <= endDateMs; index++) {
              fn.apply(instance, [curDate, index]);

              curDate = DateMath.add(curDate, DateMath.DAY, 1);
          }
        },

        // TimesheetMonthView
        plotTimesheetDays: function() {
            var instance = this;
            var intervalStartDate = instance._findCurrentIntervalStart();
            var startDateRef = DateMath.safeClearTime(intervalStartDate);

            instance.flushViewCache();

            instance.bodyNode.all(_DOT + CSS_TVT_TABLE_DATA).remove();

            var weekDayIndex = 2;

            instance[TABLE_ROWS].each(function(rowNode, index) {
                var rowStartDate = DateMath.add(startDateRef, DateMath.DAY, weekDayIndex * index);
                var rowEndDate = DateMath.add(rowStartDate, DateMath.DAY, weekDayIndex - 1);
            });
        },

        // TimesheetMonthView
        syncElementsHeaderUI: function() {
          var instance = this;
          var timesheet = instance.get(TIMESHEET);
          var headerElements = instance.get('headerElements');

          instance.columnHeaderNode.all(DIV).each(
              function(columnNode, i) {
                columnNode.html(headerElements[i]);
              }
          );
        },

        // TimesheetMonthView
        syncGridUI: function() {
            var instance = this,
                intervalStartDate = instance._findCurrentIntervalStart(),
                startDateRef = DateMath.safeClearTime(intervalStartDate),
                rowStartDate = DateMath.safeClearTime(DateMath.findMonthStart(startDateRef)),
                rowEndDate = DateMath.safeClearTime(DateMath.findMonthEnd(startDateRef)),
                cacheKey = String(intervalStartDate.getTime()).concat(rowStartDate.getTime()).concat(rowEndDate.getTime()),
                rowDataTableNode = instance.rowDataTableStack[cacheKey];

            instance[COLUMN_TABLE_GRID].removeClass(CSS_TVT_COLGRID_TODAY);

            if (!rowDataTableNode) {
                instance[TABLE_ROWS] = A.NodeList.create();
                instance[TABLE_GRID_NODE] = instance._valueTableGridNode();

                instance.loopDates(rowStartDate, rowEndDate, function(celDate, index) {
                    instance[TABLE_ROWS].push(
                        instance.buildGridRowNode(celDate, index));
                });

                instance.rowDataTableStack[cacheKey] = instance[TABLE_ROWS];
            }
            else {
                instance[TABLE_ROWS] = rowDataTableNode;
            }

            instance[TABLE_ROW_CONTAINER].setHTML(instance[TABLE_ROWS]);
        },

        // TimesheetMonthView
        syncStdContent: function() {
          var instance = this;

          instance.setStdModContent(
              WidgetStdMod.BODY, instance[ROWS_CONTAINER_NODE].getDOM());

          instance.setStdModContent(
              WidgetStdMod.HEADER, instance[HEADER_TABLE_NODE].getDOM());
        },

        // TimesheetMonthView
        _findCurrentIntervalEnd: function() {
            var instance = this,
                timesheet = instance.get(TIMESHEET),
                viewDate = timesheet.get(VIEW_DATE),
                displayDaysInterval = instance.get(DISPLAY_DAYS_INTERVAL);

            return DateMath.add(viewDate, DateMath.DAY, displayDaysInterval);
        },

        // TimesheetMonthView
        _findCurrentIntervalStart: function() {
          var instance = this,
              timesheet = instance.get(TIMESHEET),
              startDate = instance.get('today');

          if (timesheet) {
              startDate = timesheet.get(VIEW_DATE);
          }

          return startDate;
        },

        // TimesheetMonthView
     	_getTableGridNode: function(celDate, index) {
            var instance = this,
                headerElements = instance.get('headerElements'),
                headerElementsCount = headerElements.length,
                tableGridNode = instance[TABLE_GRID_NODE].item(index),
                firstRowNode = tableGridNode.one(TR),
                i;

            var formatter = instance.get(HEADER_DATE_FORMATTER);

            for (i = 0; i < headerElementsCount; i++) {
                var columnNode = A.Node.create(TPL_TVT_GRID_COLUMN);
             
                firstRowNode.append(columnNode);

                if (i === 0) {
                    columnNode.addClass(CSS_TVT_COLGRID_FIRST);

                    columnNode.append(formatter.call(instance, celDate));
                }

                if (DateMath.isToday(celDate)) {
                    columnNode.addClass(CSS_TVT_ROW_TODAY);
                }

                if (!DateMath.isWeekDay(celDate)) {
                    columnNode.addClass(CSS_TVT_ROW_WEEKEND);
                }

               
                instance[COLUMN_TABLE_GRID].push(columnNode);
            }

            return tableGridNode;
        },

        // TimesheetMonthView
        _syncTimesheetDayNodeUI: function(timesheetDay, container, celDate) {
          var instance = this;
          var timesheet = instance.get(TIMESHEET);

          if (timesheetDay) {
              var timesheetDayNodeList = timesheetDay.get(NODE);
              var startDate = timesheetDay.get(START_DATE);

              var intervalStartDate = DateMath.clearTime(instance._findCurrentIntervalStart());
             
              var timesheetDayNode = timesheetDayNodeList.item();

              timesheetDayNode.appendTo(container);

              timesheetDay.syncUI();
          }
        },

        // TimesheetMonthView
        _uiSetDate: function(val) {
            var instance = this;

            instance.syncElementsHeaderUI();
            instance.syncGridUI();
        },

           // TimesheetMonthView
    	_valueColumnHeaderNode: function() {
              var instance = this;

              var headerElements = instance.get('headerElements');
            	var headerElementsCount = headerElements.length;

              return instance._valueNodeList(headerElementsCount, TPL_TVT_HEADER_ELEMENT);
           },

        // TimesheetMonthView
        _valueNodeList: function(size, tpl) {
          var instance = this;
          var buffer = [];

          while (size--) {
              buffer.push(tpl);
          }

          return A.NodeList.create(buffer.join(_EMPTY_STR));
        },

        // TimesheetMonthView
        _valueTableGridNode: function() {
          var instance = this;

         	var rowNumber = instance.getRowsNumber()

          return instance._valueNodeList(rowNumber, TPL_TVT_TABLE_GRID);
        }
    }
});

A.TimesheetMonthView = TimesheetMonthView;

}, '0.0.1', {
	"requires": ["aui-button", "aui-datatype", "aui-component", "aui-node-base", "model", "model-list", "widget-stdmod"], "skinnable": true
});