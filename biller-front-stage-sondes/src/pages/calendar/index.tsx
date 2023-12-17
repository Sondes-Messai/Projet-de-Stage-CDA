import React, { useEffect, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Header from "../../components/global/Header";
import { useTranslation } from "react-i18next";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid"; // another one!
import googleCalendarPlugin from "@fullcalendar/google-calendar"; // another one!
import frLocale from "@fullcalendar/core/locales/fr";
import enLocale from "@fullcalendar/core/locales/en-gb";
import { tokens } from "../../theme";
import { EventContentArg, EventSourceInput } from "@fullcalendar/core";
import CalendarTooltip from "../../components/calendar/CalendarTooltip";

import TurnedInOutlinedIcon from "@mui/icons-material/TurnedInOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import SettingsService from "../../services/SettingsService";
// yacine
const CalendarScreen = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { t } = useTranslation();
  //test03/10/2023
  const [calendars, setCalendars] = useState<EventSourceInput[]>();

  useEffect(() => {
    try {
      SettingsService.getCalendars().then((calendars) =>
        setCalendars(calendars)
      );
    } catch {}
  }, []);

  document.documentElement.style.setProperty(
    "--fc-non-business-color",
    "rgba(128,128,128,0.25)"
  );
  document.documentElement.style.setProperty(
    "--fc-button-bg-color",
    theme.palette.secondary.main
  );

  document.documentElement.style.setProperty(
    "--fc-button-hover-bg-color",
    theme.palette.secondary.light
  );

  document.documentElement.style.setProperty(
    "--fc-button-active-bg-color",
    theme.palette.secondary.dark
  );

  document.documentElement.style.setProperty(
    "--fc-bg-event-color",
    colors.greenAccent[500]
  );

  document.documentElement.style.setProperty(
    "--fc-page-bg-color",
    colors.primary[400]
  );
  // sondes 0304
  document.documentElement.style.setProperty(
    "--fc-border-color",
    colors.grey[400]
  );

  document.documentElement.style.setProperty(
    "--fc-neutral-text-color",
    theme.palette.text.primary
  );
  // sondes 03/10/2023
  document.documentElement.style.setProperty(
    "--fc-button-text-color",
    theme.palette.primary.main
  );

  document.documentElement.style.setProperty(
    "--fc-more-link-bg-color",
    theme.palette.primary.contrastText
  );

  document.documentElement.style.setProperty(
    "--fc-today-bg-color",
    theme.palette.secondary.light
  );

  document.documentElement.style.setProperty(
    "--fc-now-indicator-color",
    "rgba(234,67,53,1)"
  );

  document.documentElement.style.setProperty(
    "--fc-today-text-color",
    theme.palette.secondary.contrastText
  );

  const buildTooltipContent = (eventInfo: EventContentArg) => {
    return (
      <Box
        display="flex"
        flexDirection="column"
        flexGrow="initial"
        color={theme.palette.text.primary}
      >
        <Box display="flex">
          <TurnedInOutlinedIcon sx={{ color: eventInfo.backgroundColor }} />
          <Typography variant="h5" marginLeft={1} marginRight={4}>
            {eventInfo.event.title}
          </Typography>
        </Box>

        {eventInfo.event.start?.toLocaleDateString() ===
        eventInfo.event.end?.toLocaleDateString() ? (
          <Typography variant="body2" marginLeft={4} marginRight={4}>
            {eventInfo.event.start?.toLocaleDateString([], {
              dateStyle: "full",
            })}

            {!eventInfo.event.allDay && (
              <>
                {t("calendar.from")}
                {eventInfo.event.start?.toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                })}
                {t("calendar.to")}
                {eventInfo.event.end?.toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </>
            )}
          </Typography>
        ) : (
          <Typography variant="body2" marginLeft={4} marginRight={4}>
            {t("calendar.fromDate")}{" "}
            {eventInfo.event.start?.toLocaleDateString([], {
              dateStyle: "medium",
            })}{" "}
            {eventInfo.event.start?.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}{" "}
            {t("calendar.toDate")}{" "}
            {eventInfo.event.end?.toLocaleDateString([], {
              dateStyle: "medium",
            })}{" "}
            {eventInfo.event.end?.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        )}
        {eventInfo.event.extendedProps.location && (
          <Box marginTop={2} display="flex">
            <LocationOnOutlinedIcon />{" "}
            <Typography variant="body2" marginLeft={1}>
              {eventInfo.event.extendedProps.location}
            </Typography>
          </Box>
        )}
        {eventInfo.event.extendedProps.description && (
          <Box marginTop={2} display="flex">
            <SubjectOutlinedIcon />{" "}
            <Typography variant="body2" marginLeft={1}>
              {eventInfo.event.extendedProps.description}
            </Typography>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Box margin="0 20px">
      <Header
        title={t("calendarScreen.Title")}
        subtitle={t("calendarScreen.Subtitle")}
      />

      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, googleCalendarPlugin]}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "timeGridDay,timeGridWeek,dayGridMonth",
        }}
        initialView="timeGridWeek"
        locales={[frLocale, enLocale]}
        height="50em"
        nowIndicator={true}
        googleCalendarApiKey="AIzaSyC9nMY9UIUecBp08cHHQMW6lSf6jDzYYrA"
        eventSources={calendars}
        eventClassNames={"event"}
        weekNumbers={true}
        businessHours={true}
        scrollTime={"08:00:00"}
        fixedWeekCount={false}
        eventDidMount={(arg) => console.log(arg)}
        eventContent={(eventInfo: EventContentArg) =>
          eventInfo.view.type === "dayGridMonth" ? (
            <>
              {!eventInfo.event.allDay && (
                <>
                  <CalendarTooltip title={buildTooltipContent(eventInfo)}>
                    <Box
                      className="fc-daygrid-event-dot"
                      sx={{
                        borderColor: eventInfo.backgroundColor,
                      }}
                    ></Box>
                  </CalendarTooltip>
                  <CalendarTooltip title={buildTooltipContent(eventInfo)}>
                    <Box className="fc-event-time">
                      {eventInfo.event.start?.toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                      {" - "}
                      {eventInfo.event.end?.toLocaleTimeString([], {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </Box>
                  </CalendarTooltip>
                </>
              )}
              <CalendarTooltip title={buildTooltipContent(eventInfo)}>
                <Box className="fc-event-title fc-sticky">
                  {eventInfo.event.title}
                </Box>
              </CalendarTooltip>
            </>
          ) : (
            <CalendarTooltip title={buildTooltipContent(eventInfo)}>
              <Box className="fc-event-main-frame" display="flex">
                {!eventInfo.event.allDay && (
                  <Box className="fc-event-time">
                    {eventInfo.event.start?.toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                    })}
                    {" - "}
                    {eventInfo.event.end?.toLocaleTimeString([], {
                      hour: "numeric",
                      minute: "2-digit",
                    })}{" "}
                  </Box>
                )}
                <Box className="fc-event-title-container">
                  <Box className="fc-event-title fc-sticky">
                    {eventInfo.event.title}
                  </Box>
                </Box>
              </Box>
            </CalendarTooltip>
          )
        }
      />
    </Box>
  );
};

export default CalendarScreen;
