import { router, useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  Image,
  Pressable,
  TextInput,
  StyleSheet,
  Modal,
  Linking,
  Platform,
  useWindowDimensions,
} from "react-native";

type Tab = "Home" | "Journey" | "Updates" | "Messages" | "Profile";
const icons: Record<Tab, string> = {
  Home: "⌂",
  Journey: "↗",
  Updates: "☷",
  Messages: "✉",
  Profile: "☺",
};
const activities = [
  {
    time: "12:30 PM",
    icon: "🎨",
    title: "Little artists, big imaginations",
    body: "A colourful afternoon of painting and creating together.",
    color: "#f6e8e2",
  },
  {
    time: "11:45 AM",
    icon: "🍲",
    title: "Lunch, all finished!",
    body: "Rice, vegetables and dhal. A happy, healthy little tummy.",
    color: "#eef0d9",
  },
  {
    time: "8:15 AM",
    icon: "🌼",
    title: "A lovely start to the day",
    body: "Checked in with Teacher Anjali. Ready for a day of discovery.",
    color: "#e4eff5",
  },
];
const services = [
  { name: "Daycare", detail: "Ages 2–5 · monthly", price: 25000 },
  { name: "After-school care", detail: "Ages 6–9 · monthly", price: 18000 },
  { name: "School transport", detail: "School days · monthly", price: 8000 },
  { name: "Extended-hours care", detail: "Per day", price: 2000 },
  { name: "Holiday care", detail: "Per day", price: 2500 },
  { name: "Weekend / special care", detail: "Per day", price: 3000 },
];
export default function App() {
  const { width } = useWindowDimensions();
  const desktop = Platform.OS === "web" && width >= 1000;
  const compact = width < 380;
  const { screen } = useLocalSearchParams<{ screen?: string }>();
  const tab: Tab =
    screen && Object.keys(icons).includes(screen) ? (screen as Tab) : "Home";
  const setTab = (next: Tab) => router.setParams({ screen: next });
  const [modal, setModal] = useState<"book" | "notifications" | null>(null);
  const [selected, setSelected] = useState("Extended-hours care");
  const [date, setDate] = useState("");
  const [booking, setBooking] = useState("");
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [error, setError] = useState("");
  const [child, setChild] = useState("Amaya");
  const [saved, setSaved] = useState(false);
  const [filter, setFilter] = useState("Today");
  const title = (a: string, b?: string) => (
    <View style={s.sectionHead}>
      <Text style={s.h2}>{a}</Text>
      {b && (
        <Pressable onPress={() => setTab("Updates")}>
          <Text style={s.link}>{b} →</Text>
        </Pressable>
      )}
    </View>
  );
  const button = (label: string, action: () => void, light = false) => (
    <Pressable
      accessibilityRole="button"
      onPress={action}
      style={[s.button, light && s.lightButton]}
    >
      <Text style={[s.buttonText, light && { color: "#315d54" }]}>{label}</Text>
    </Pressable>
  );
  const feed = () =>
    activities.map((a, i) => (
      <View key={a.title} style={s.feed}>
        <View style={[s.activityIcon, { backgroundColor: a.color }]}>
          <Text style={{ fontSize: 25 }}>{a.icon}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={s.time}>{a.time} · TEACHER ANJALI</Text>
          <Text style={s.feedTitle}>{a.title}</Text>
          <Text style={s.body}>{a.body}</Text>
          {i === 0 && (
            <View style={s.art}>
              <Text style={{ fontSize: 52 }}>🌷 🌻 🌷</Text>
              <Text style={s.artCaption}>
                Made with little hands & lots of love
              </Text>
            </View>
          )}
        </View>
      </View>
    ));
  return (
    <SafeAreaView style={s.safe}>
      <StatusBar style="dark" />
      <View style={[s.app, desktop && s.desktopApp]}>
        {desktop && (
          <View style={s.sidebar}>
            <View style={s.sidebarBrand}>
              <Image
                source={require("./assets/happy-hearts.jpeg")}
                style={s.sidebarLogo}
              />
              <Text style={s.brandName}>happy hearts ♥</Text>
              <Text style={s.brandSub}>A LITTLE WORLD OF CARE</Text>
            </View>
            <Text style={s.sidebarLabel}>PARENT PORTAL</Text>
            {(Object.keys(icons) as Tab[]).map((t) => (
              <Pressable
                accessibilityRole="tab"
              accessibilityLabel={t}
                accessibilityState={{ selected: tab === t }}
                key={t}
                onPress={() => setTab(t)}
                style={[s.sideLink, tab === t && s.sideLinkActive]}
              >
                <Text style={s.sideSymbol}>{icons[t]}</Text>
                <Text
                  style={[s.sideLinkText, tab === t && { fontWeight: "700" }]}
                >
                  {t === "Journey"
                    ? "School transport"
                    : t === "Updates"
                      ? "Daily updates"
                      : t}
                </Text>
              </Pressable>
            ))}
            <View style={s.sidebarBottom}>
              <Text style={s.h2}>We’re here for you</Text>
              <Text style={s.body}>
                A little reassurance is always a call away.
              </Text>
              {button(
                "Contact the centre",
                () => Linking.openURL("tel:+94382292249"),
                true,
              )}
              <Text style={s.time}>BANDARAGAMA · SRI LANKA</Text>
            </View>
          </View>
        )}
        <View style={s.mainPane}>
          <View style={[s.header, desktop && s.desktopHeader]}>
            <View style={s.brand}>
              <Image
                source={require("./assets/happy-hearts.jpeg")}
                style={s.logo}
              />
              <View>
                <Text style={s.brandName}>
                  happy hearts<Text style={{ color: "#c78979" }}> ♥</Text>
                </Text>
                <Text style={s.brandSub}>A LITTLE WORLD OF CARE</Text>
              </View>
            </View>
            <Pressable
              accessibilityLabel="Open notifications"
              onPress={() => setModal("notifications")}
              style={s.bell}
            >
              <Text style={{ fontSize: 22 }}>♧</Text>
              <View style={s.dot} />
            </Pressable>
          </View>
          <ScrollView
            contentContainerStyle={[
              s.content,
              desktop && s.desktopContent,
              compact && { padding: 16 },
            ]}
            style={{ flex: 1 }}
            showsVerticalScrollIndicator={false}
          >
            <View style={s.demo}>
              <View style={s.smallDot} />
              <Text style={s.demoText}>PARENT PREVIEW · SAMPLE DATA</Text>
            </View>
            {tab === "Home" && (
              <>
                <View style={s.greeting}>
                  <View>
                    <Text style={s.eyebrow}>
                      YOUR DAILY DOSE OF PEACE OF MIND
                    </Text>
                    <Text style={s.h1}>
                      Hello, Dilini <Text style={{ fontSize: 28 }}>☀️</Text>
                    </Text>
                    <Text style={s.body}>Little moments. Happy hearts.</Text>
                  </View>
                  <View style={s.parentAvatar}>
                    <Text style={{ fontSize: 26 }}>D</Text>
                  </View>
                </View>
                <View style={[s.homeColumns, desktop && s.homeColumnsDesktop]}>
                  <View
                    style={[
                      s.homeColumn,
                      desktop && { flex: 1.12, width: undefined },
                    ]}
                  >
                    <View style={s.childCard}>
                      <View style={s.childTop}>
                        <View style={s.childAvatar}>
                          <Text style={{ fontSize: 38 }}>👧🏽</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                          <Text style={s.childName}>
                            {child}’s little world
                          </Text>
                          <Text style={s.body}>
                            Little Explorers · 4 years old
                          </Text>
                        </View>
                        <View style={s.status}>
                          <Text style={s.statusText}>● At the centre</Text>
                        </View>
                      </View>
                      <View style={s.divider} />
                      <View style={s.stats}>
                        <View>
                          <Text style={s.statLabel}>CHECKED IN</Text>
                          <Text style={s.statValue}>
                            8:15 AM <Text style={{ color: "#68886c" }}>✓</Text>
                          </Text>
                        </View>
                        <View>
                          <Text style={s.statLabel}>TODAY’S MOOD</Text>
                          <Text style={s.statValue}>Happy 😊</Text>
                        </View>
                        <View>
                          <Text style={s.statLabel}>PICKUP</Text>
                          <Text style={s.statValue}>5:00 PM</Text>
                        </View>
                      </View>
                    </View>
                    <View style={s.journeyCard}>
                      <View style={s.journeyCopy}>
                        <Text style={s.eyebrow}>SAFE JOURNEYS, EVERY DAY</Text>
                        <Text style={s.journeyTitle}>
                          Close to them,{"\n"}wherever you are.
                        </Text>
                        <Text style={s.body}>
                          Follow every little journey with care.
                        </Text>
                        <Pressable
                          onPress={() => setTab("Journey")}
                          style={s.journeyButton}
                        >
                          <Text style={s.link}>View transport details ↗</Text>
                        </Pressable>
                      </View>
                      <Text style={s.bus}>🚐</Text>
                      <View style={s.road} />
                    </View>
                    {title("A little help, a tap away")}
                    <View style={s.quickRow}>
                      {[
                        ["📅", "Book care", () => setModal("book")],
                        [
                          "✓",
                          "Attendance",
                          () => {
                            setTab("Updates");
                            setFilter("Attendance");
                          },
                        ],
                        ["💬", "Message us", () => setTab("Messages")],
                      ].map(([icon, label, action]) => (
                        <Pressable
                          key={String(label)}
                          onPress={action as () => void}
                          style={s.quick}
                        >
                          <View style={s.quickIcon}>
                            <Text style={{ fontSize: 23 }}>{String(icon)}</Text>
                          </View>
                          <Text style={s.quickLabel}>{String(label)}</Text>
                        </Pressable>
                      ))}
                    </View>
                  </View>
                  <View style={[s.homeColumn, desktop && s.momentsPanel]}>
                    {title("Moments from today", "See all")}
                    {feed()}
                  </View>
                </View>
                <View style={s.footerNote}>
                  <Text style={{ fontSize: 22 }}>♡</Text>
                  <Text style={s.footerText}>
                    Growing together, one little moment at a time.
                  </Text>
                </View>
              </>
            )}
            {tab === "Journey" && (
              <>
                <Text style={s.h1}>Every little journey</Text>
                <Text style={s.body}>
                  School to centre, with care all the way.
                </Text>
                <View style={s.map}>
                  <View style={s.mapRoad} />
                  <Text style={s.mapLabel}>BANDARAGAMA</Text>
                  <Text style={s.mapBus}>🚐</Text>
                  <Text style={s.mapSchool}>🏫 School</Text>
                  <Text style={s.mapCentre}>♡ Happy Hearts</Text>
                  <View style={s.mapBadge}>
                    <Text style={s.link}>
                      Illustrative route · GPS not connected
                    </Text>
                  </View>
                </View>
                <View style={s.childCard}>
                  <Text style={s.h2}>Safely at the centre</Text>
                  <Text style={s.body}>Sample journey · School pickup</Text>
                  {[
                    "12:45 PM   Picked up from school",
                    "12:50 PM   On the way to Happy Hearts",
                    "1:05 PM     Arrived & handed over to teacher",
                  ].map((x) => (
                    <Text key={x} style={s.routeStep}>
                      ✓ {x}
                    </Text>
                  ))}
                  <View style={s.divider} />
                  <Text style={s.feedTitle}>Your transport team</Text>
                  <Text style={s.body}>
                    Sample driver · Happy Hearts van 01
                  </Text>
                  <Text style={s.body}>
                    Live vehicle location will appear when GPS is connected.
                  </Text>
                  {button("Contact the centre", () =>
                    Linking.openURL("tel:+94382292249"),
                  )}
                </View>
              </>
            )}
            {tab === "Updates" && (
              <>
                <Text style={s.h1}>Little moments</Text>
                <Text style={s.body}>A window into {child}’s day.</Text>
                <View style={s.chips}>
                  {["Today", "Attendance"].map((x) => (
                    <Pressable
                      key={x}
                      onPress={() => setFilter(x)}
                      style={[s.chip, filter === x && s.chipActive]}
                    >
                      <Text
                        style={{ color: filter === x ? "white" : "#315d54" }}
                      >
                        {x}
                      </Text>
                    </Pressable>
                  ))}
                </View>
                {filter === "Today" ? (
                  feed()
                ) : (
                  <View style={s.childCard}>
                    <Text style={s.h2}>Today’s attendance</Text>
                    <Text style={s.routeStep}>✓ Checked in · 8:15 AM</Text>
                    <Text style={s.body}>Received by Teacher Anjali</Text>
                    <View style={s.divider} />
                    <Text style={s.feedTitle}>Pickup expected · 5:00 PM</Text>
                    <Text style={s.body}>Checkout has not been recorded.</Text>
                    <Text style={s.time}>SAMPLE ATTENDANCE RECORD</Text>
                  </View>
                )}
              </>
            )}
            {tab === "Messages" && (
              <>
                <Text style={s.h1}>Let’s keep in touch</Text>
                <Text style={s.body}>Your Happy Hearts care team.</Text>
                <View style={s.teacher}>
                  <Text style={{ fontSize: 35 }}>👩🏽‍🏫</Text>
                  <View>
                    <Text style={s.feedTitle}>Teacher Anjali</Text>
                    <Text style={s.body}>
                      Little Explorers · Demo conversation
                    </Text>
                  </View>
                </View>
                <View style={s.incoming}>
                  <Text style={s.message}>
                    Hello Dilini! {child} had a lovely morning creating flower
                    paintings. She’s excited to show you at pickup. 🌷
                  </Text>
                  <Text style={s.time}>12:35 PM · SAMPLE MESSAGE</Text>
                </View>
                {messages.map((m, i) => (
                  <View key={i} style={s.outgoing}>
                    <Text style={s.message}>{m}</Text>
                    <Text style={s.time}>
                      Saved on this screen · Not sent to centre
                    </Text>
                  </View>
                ))}
                <View style={s.compose}>
                  <TextInput
                    accessibilityLabel="Message"
                    placeholder="Write a little note…"
                    value={draft}
                    onChangeText={setDraft}
                    multiline
                    style={s.input}
                  />
                  <Pressable
                    accessibilityLabel="Save demo message"
                    style={s.send}
                    onPress={() => {
                      if (draft.trim()) {
                        setMessages([...messages, draft.trim()]);
                        setDraft("");
                      }
                    }}
                  >
                    <Text style={{ color: "white", fontSize: 22 }}>↑</Text>
                  </Pressable>
                </View>
                <Text style={s.body}>
                  Preview messages stay in memory during this session.
                </Text>
              </>
            )}
            {tab === "Profile" && (
              <>
                <Text style={s.h1}>Your little family</Text>
                <Text style={s.body}>Care that feels personal.</Text>
                <View style={s.childCard}>
                  <Text style={s.h2}>Child profile</Text>
                  <Text style={s.fieldLabel}>Child’s first name</Text>
                  <TextInput
                    style={s.formInput}
                    value={child}
                    onChangeText={(v) => {
                      setChild(v);
                      setSaved(false);
                    }}
                    accessibilityLabel="Child’s first name"
                  />
                  <Text style={s.fieldLabel}>Care group</Text>
                  <Text style={s.body}>Little Explorers · Ages 2–5</Text>
                  {button("Save profile", () => setSaved(true))}
                  {saved && (
                    <Text style={s.success}>✓ Updated for this session</Text>
                  )}
                </View>
                <View style={s.childCard}>
                  <Text style={s.h2}>Care & services</Text>
                  {services.map((x) => (
                    <View style={s.serviceRow} key={x.name}>
                      <View style={{ flex: 1 }}>
                        <Text style={s.feedTitle}>{x.name}</Text>
                        <Text style={s.body}>{x.detail}</Text>
                      </View>
                      <Text style={s.price}>
                        Rs. {x.price.toLocaleString()}
                      </Text>
                    </View>
                  ))}
                  {button("Request a booking", () => setModal("book"))}
                </View>
                <View style={s.childCard}>
                  <Text style={s.h2}>Happy Hearts Childcare</Text>
                  <Text style={s.body}>No. 198/2, Bolabotuwa, Bandaragama</Text>
                  {button(
                    "Call +94 765799580",
                    () => Linking.openURL("tel:+94382292249"),
                    true,
                  )}
                  {button(
                    "Email the centre",
                    () =>
                      Linking.openURL("mailto:info@happyheartschildcare.com"),
                    true,
                  )}
                </View>
              </>
            )}
          </ScrollView>
          {!desktop && (
            <View style={s.nav}>
              {(Object.keys(icons) as Tab[]).map((t) => (
                <Pressable
                  accessibilityRole="tab"
              accessibilityLabel={t}
                  accessibilityState={{ selected: tab === t }}
                  onPress={() => setTab(t)}
                  key={t}
                  style={s.navItem}
                >
                  <View style={[s.navIcon, tab === t && s.navActive]}>
                    <Text
                      style={[s.navSymbol, tab === t && { color: "#315d54" }]}
                    >
                      {icons[t]}
                    </Text>
                  </View>
                  <Text
                    style={[
                      s.navLabel,
                      tab === t && { color: "#315d54", fontWeight: "700" },
                    ]}
                  >
                    {t}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>
      </View>
      <Modal
        visible={modal !== null}
        transparent
        animationType="slide"
        onRequestClose={() => setModal(null)}
      >
        <View style={s.overlay}>
          <ScrollView style={s.sheet} contentContainerStyle={{padding:24}} keyboardShouldPersistTaps="handled">
            <View style={s.sectionHead}>
              <Text style={s.h2}>
                {modal === "book"
                  ? "A little extra care"
                  : "Your notifications"}
              </Text>
              <Pressable
                accessibilityLabel="Close"
                onPress={() => setModal(null)}
              >
                <Text style={s.close}>×</Text>
              </Pressable>
            </View>
            {modal === "notifications" ? (
              <>
                <Text style={s.feedTitle}>
                  ♡ {child} is having a lovely day
                </Text>
                <Text style={s.body}>
                  New art activity update from Teacher Anjali.
                </Text>
                <Text style={s.time}>Sample notification · 12:30 PM</Text>
                {button("View updates", () => {
                  setModal(null);
                  setTab("Updates");
                })}
              </>
            ) : (
              <>
                <Text style={s.body}>
                  Choose a service to try a booking request.
                </Text>
                <View style={s.chips}>
                  {services.map((x) => (
                    <Pressable
                      key={x.name}
                      onPress={() => {
                        setSelected(x.name);
                        setBooking("");
                      }}
                      style={[s.chip, selected === x.name && s.chipActive]}
                    >
                      <Text
                        style={{
                          color: selected === x.name ? "white" : "#315d54",
                        }}
                      >
                        {x.name}
                      </Text>
                    </Pressable>
                  ))}
                </View>
                <Text style={s.fieldLabel}>Requested date (YYYY-MM-DD)</Text>
                <TextInput
                  accessibilityLabel="Booking date"
                  placeholder="2026-11-20"
                  value={date}
                  onChangeText={setDate}
                  style={s.formInput}
                />
                <Text style={s.price}>
                  Rs.{" "}
                  {services
                    .find((x) => x.name === selected)
                    ?.price.toLocaleString()}{" "}
                  · {services.find((x) => x.name === selected)?.detail}
                </Text>
                {error && <Text style={s.error}>{error}</Text>}
                {booking && <Text style={s.success}>{booking}</Text>}
                {button("Preview booking request", () => {
                  const d = new Date(date + "T12:00:00");
                  if (
                    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
                    isNaN(d.getTime()) ||
                    d.toISOString().slice(0, 10) !== date
                  ) {
                    setError("Enter a valid date, for example 2026-11-20.");
                    return;
                  }
                  setError("");
                  setBooking(
                    `${selected} for ${child} on ${date}. Preview saved for this session; contact the centre to confirm.`,
                  );
                })}
              </>
            )}
          </ScrollView>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  desktopApp: { maxWidth: 1600, flexDirection: "row" },
  mainPane: { flex: 1, minWidth: 0 },
  sidebar: {
    width: 250,
    backgroundColor: "#fffefb",
    borderRightWidth: 1,
    borderColor: "#e6e9de",
    padding: 24,
  },
  sidebarBrand: {
    alignItems: "center",
    paddingVertical: 24,
    marginBottom: 32,
    gap: 8,
  },
  sidebarLogo: { width: 88, height: 88, borderRadius: 44, marginBottom: 8 },
  sidebarLabel: {
    fontSize: 9,
    letterSpacing: 2,
    color: "#8b9885",
    marginBottom: 20,
  },
  sideLink: {
    flexDirection: "row",
    gap: 14,
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderRadius: 13,
    marginBottom: 8,
  },
  sideLinkActive: { backgroundColor: "#eaf0e2" },
  sideSymbol: { fontSize: 25, width: 26, color: "#426651" },
  sideLinkText: { fontSize: 13, color: "#426651" },
  sidebarBottom: { marginTop: "auto", paddingTop: 30, gap: 10 },
  desktopHeader: {
    paddingHorizontal: 40,
    paddingTop: 22,
    paddingBottom: 22,
    backgroundColor: "#fffefb",
  },
  desktopContent: {
    padding: 40,
    maxWidth: 1200,
    width: "100%",
    alignSelf: "center",
  },
  homeColumns: { width: "100%" },
  homeColumnsDesktop: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 28,
  },
  homeColumn: { minWidth: 0, width: "100%" },
  momentsPanel: {
    flex: 1,
    width: undefined,
    backgroundColor: "#fffefb",
    borderWidth: 1,
    borderColor: "#e7e9df",
    borderRadius: 22,
    padding: 24,
    marginTop: 6,
  },

  safe: { flex: 1, backgroundColor: "#faf9f5" },
  app: {
    flex: 1,
    width: "100%",
    maxWidth: 780,
    alignSelf: "center",
    backgroundColor: "#faf9f5",
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: Platform.OS === "android" ? 35 : 16,
    paddingBottom: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderColor: "#eae9e1",
  },
  brand: { flexDirection: "row", alignItems: "center", gap: 10 },
  logo: { width: 44, height: 44, borderRadius: 22 },
  brandName: {
    fontSize: 23,
    fontWeight: "700",
    color: "#315d54",
    letterSpacing: -1,
  },
  brandSub: { fontSize: 8, letterSpacing: 2, color: "#8a9185", marginTop: 4 },
  bell: {
    width: 40,
    height: 40,
    borderWidth: 1,
    borderColor: "#e6e5db",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#cd967e",
    position: "absolute",
    right: 9,
    top: 8,
  },
  content: { padding: 24, paddingBottom: 30 },
  demo: {
    flexDirection: "row",
    gap: 6,
    alignItems: "center",
    marginBottom: 22,
  },
  smallDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#a4af93",
  },
  demoText: { fontSize: 8, letterSpacing: 1.8, color: "#899381" },
  greeting: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
  },
  eyebrow: {
    fontSize: 8,
    fontWeight: "600",
    letterSpacing: 1.5,
    color: "#728577",
    marginBottom: 8,
  },
  h1: {
    fontSize: 32,
    fontWeight: "600",
    letterSpacing: -1.4,
    color: "#294d44",
    marginBottom: 7,
  },
  body: { fontSize: 12, lineHeight: 20, color: "#859085" },
  parentAvatar: {
    height: 46,
    width: 46,
    borderRadius: 23,
    backgroundColor: "#f1e5d9",
    alignItems: "center",
    justifyContent: "center",
  },
  childCard: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#e9e9df",
    marginTop: 6,
    marginBottom: 22,
  },
  childTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
    flexWrap: "wrap",
  },
  childAvatar: {
    width: 56,
    height: 56,
    borderRadius: 18,
    backgroundColor: "#f4e7d9",
    justifyContent: "center",
    alignItems: "center",
  },
  childName: {
    fontSize: 17,
    fontWeight: "600",
    color: "#344e44",
    marginBottom: 4,
  },
  status: { backgroundColor: "#eef3e7", padding: 7, borderRadius: 20 },
  statusText: { color: "#6b8055", fontSize: 9, fontWeight: "600" },
  divider: { height: 1, backgroundColor: "#eeeee5", marginVertical: 18 },
  stats: { flexDirection: "row", justifyContent: "space-between" },
  statLabel: { fontSize: 8, color: "#8c9388", letterSpacing: 1 },
  statValue: {
    fontSize: 13,
    color: "#3c5146",
    marginTop: 8,
    fontWeight: "600",
  },
  journeyCard: {
    borderRadius: 22,
    backgroundColor: "#eaf0e6",
    minHeight: 195,
    overflow: "hidden",
    padding: 22,
    marginBottom: 26,
  },
  journeyCopy: { zIndex: 1, maxWidth: "80%" },
  journeyTitle: {
    fontSize: 24,
    lineHeight: 30,
    letterSpacing: -0.7,
    color: "#345a49",
    fontWeight: "600",
    marginBottom: 8,
  },
  journeyButton: { marginTop: 17 },
  bus: {
    fontSize: 69,
    position: "absolute",
    right: 7,
    bottom: 36,
    transform: [{ rotate: "-8deg" }],
  },
  road: {
    position: "absolute",
    right: -32,
    bottom: 7,
    width: 190,
    height: 40,
    borderTopWidth: 2,
    borderColor: "#c3d2b8",
    transform: [{ rotate: "-18deg" }],
  },
  sectionHead: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 17,
  },
  h2: {
    fontSize: 18,
    fontWeight: "600",
    color: "#344f43",
    letterSpacing: -0.4,
  },
  link: { fontSize: 11, color: "#426854", fontWeight: "600" },
  quickRow: { flexDirection: "row", gap: 12, marginBottom: 30 },
  quick: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#e7e8dd",
    backgroundColor: "#fff",
    borderRadius: 17,
    paddingVertical: 17,
    alignItems: "center",
    gap: 10,
  },
  quickIcon: {
    width: 40,
    height: 40,
    borderRadius: 13,
    backgroundColor: "#f3f1e6",
    alignItems: "center",
    justifyContent: "center",
  },
  quickLabel: { fontSize: 11, color: "#51614f", fontWeight: "500" },
  feed: { flexDirection: "row", gap: 13, marginBottom: 22 },
  activityIcon: {
    width: 43,
    height: 43,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },
  time: {
    fontSize: 8,
    letterSpacing: 0.8,
    color: "#92998d",
    marginTop: 3,
    marginBottom: 7,
  },
  feedTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#415544",
    marginBottom: 4,
  },
  art: {
    backgroundColor: "#f4eada",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    marginTop: 13,
  },
  artCaption: { fontSize: 10, color: "#9c866d", marginTop: 8 },
  footerNote: { alignItems: "center", gap: 9, padding: 15 },
  footerText: { fontSize: 10, color: "#939a87" },
  nav: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "#e8e9df",
    paddingTop: 10,
    paddingBottom: Platform.OS === "android" ? 15 : 8,
    backgroundColor: "#fffefb",
  },
  navItem: { flex: 1, alignItems: "center", gap: 5 },
  navIcon: {
    width: 45,
    height: 30,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },
  navActive: { backgroundColor: "#eaf0e2" },
  navSymbol: { fontSize: 24, color: "#91998d" },
  navLabel: { fontSize: 9, color: "#92998e" },
  button: {
    backgroundColor: "#355e50",
    padding: 15,
    borderRadius: 13,
    alignItems: "center",
    marginTop: 17,
  },
  lightButton: { backgroundColor: "#edf1e7" },
  buttonText: { color: "white", fontSize: 12, fontWeight: "600" },
  map: {
    height: 285,
    backgroundColor: "#e5ebdc",
    borderRadius: 24,
    marginVertical: 25,
    overflow: "hidden",
  },
  mapRoad: {
    width: 360,
    height: 120,
    borderWidth: 16,
    borderColor: "#faf9ef",
    transform: [{ rotate: "-35deg" }],
    position: "absolute",
    top: 80,
    left: 10,
    borderRadius: 65,
  },
  mapLabel: {
    position: "absolute",
    top: 25,
    left: 24,
    color: "#a0ac95",
    letterSpacing: 3,
    fontSize: 12,
  },
  mapBus: { position: "absolute", top: 110, left: "46%", fontSize: 42 },
  mapSchool: {
    position: "absolute",
    bottom: 70,
    left: 20,
    fontSize: 15,
    color: "#56654e",
  },
  mapCentre: {
    position: "absolute",
    top: 65,
    right: 15,
    fontSize: 14,
    color: "#47624c",
  },
  mapBadge: {
    position: "absolute",
    bottom: 14,
    left: 15,
    right: 15,
    padding: 12,
    borderRadius: 12,
    backgroundColor: "#fffdf4",
    alignItems: "center",
  },
  routeStep: { fontSize: 12, color: "#52725a", marginTop: 20, lineHeight: 19 },
  chips: { flexDirection: "row", flexWrap: "wrap", gap: 9, marginVertical: 20 },
  chip: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: "#eaf0e4",
  },
  chipActive: { backgroundColor: "#3b6554" },
  teacher: {
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
    padding: 18,
    backgroundColor: "#edf1e7",
    borderRadius: 17,
    marginVertical: 24,
  },
  incoming: {
    padding: 18,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#e5e8dd",
    borderRadius: 18,
    marginRight: 25,
    marginBottom: 15,
  },
  outgoing: {
    padding: 18,
    backgroundColor: "#e7eee0",
    borderRadius: 18,
    marginLeft: 25,
    marginBottom: 15,
  },
  message: { fontSize: 13, lineHeight: 23, color: "#4d6352" },
  compose: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    marginVertical: 22,
  },
  input: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: "#dce2d4",
    borderRadius: 15,
    backgroundColor: "white",
    color: "#344e44",
  },
  send: {
    height: 46,
    width: 46,
    borderRadius: 23,
    backgroundColor: "#355e50",
    alignItems: "center",
    justifyContent: "center",
  },
  fieldLabel: {
    fontSize: 11,
    color: "#687d68",
    marginTop: 20,
    marginBottom: 9,
  },
  formInput: {
    borderWidth: 1,
    borderColor: "#dce1d4",
    padding: 13,
    borderRadius: 12,
    color: "#344e44",
    backgroundColor: "#fff",
    marginBottom: 10,
  },
  serviceRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: "#edefe6",
  },
  price: { fontSize: 12, fontWeight: "600", color: "#4b694e" },
  overlay: {
    flex: 1,
    backgroundColor: "#20372a66",
    justifyContent: "center",
    padding: 20,
  },
  sheet: {
    maxHeight: "90%",
    flexGrow: 0,
    maxWidth: 520,
    width: "100%",
    alignSelf: "center",
    backgroundColor: "#faf9f5",
    borderRadius: 25,
  },
  close: { fontSize: 28, color: "#6e7f6d" },
  success: { fontSize: 12, lineHeight: 20, color: "#4e7850", marginTop: 15 },
  error: { color: "#ad5147", fontSize: 12, marginTop: 12 },
});
