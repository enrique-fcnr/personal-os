import { Segment } from "@/lib/types";

export const SEGMENTS: Segment[] = [
  {
    id: "work",
    label: "WORK",
    thumbnail: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=80",
    heroBackground:
      "linear-gradient(135deg, rgba(10,28,64,0.95) 0%, rgba(36,113,231,0.3) 60%, rgba(10,28,64,0.95) 100%)",
    detailTitle: "Deep Work Protocol",
    taskCount: 14,
    statusPrimary: "04:20:00",
    statusSub: "REMAINING",
    ctaLabel: "LAUNCH DEEP WORK",
    accentColor: "#2471E7",
    href: "/work",
  },
  {
    id: "study",
    label: "STUDY",
    thumbnail: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=600&q=80",
    heroBackground:
      "linear-gradient(135deg, rgba(10,28,64,0.95) 0%, rgba(91,179,253,0.25) 60%, rgba(10,28,64,0.95) 100%)",
    detailTitle: "Focus Learning Mode",
    taskCount: 6,
    statusPrimary: "82%",
    statusSub: "PROGRESS",
    ctaLabel: "ENTER STUDY MODE",
    accentColor: "#5BB3FD",
    href: "/study",
  },
  {
    id: "workout",
    label: "WORKOUT",
    thumbnail: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&q=80",
    heroBackground:
      "linear-gradient(135deg, rgba(10,28,64,0.95) 0%, rgba(230,112,30,0.3) 60%, rgba(10,28,64,0.95) 100%)",
    detailTitle: "Performance Engine",
    taskCount: 8,
    statusPrimary: "740",
    statusSub: "KCAL TARGET",
    ctaLabel: "START WORKOUT",
    accentColor: "#E6701E",
  },
  {
    id: "relationship",
    label: "RELATIONSHIP",
    thumbnail: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=600&q=80",
    heroBackground:
      "linear-gradient(135deg, rgba(10,28,64,0.95) 0%, rgba(180,120,200,0.25) 60%, rgba(10,28,64,0.95) 100%)",
    detailTitle: "Social Synchronicity",
    taskCount: 3,
    statusPrimary: "3",
    statusSub: "EVENTS TODAY",
    ctaLabel: "VIEW CONNECTIONS",
    accentColor: "#B478C8",
  },
  {
    id: "nutrition",
    label: "NUTRITION",
    thumbnail: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&q=80",
    heroBackground:
      "linear-gradient(135deg, rgba(10,28,64,0.95) 0%, rgba(52,211,153,0.25) 60%, rgba(10,28,64,0.95) 100%)",
    detailTitle: "Fuel Optimization",
    taskCount: 5,
    statusPrimary: "2.4L",
    statusSub: "HYDRATION",
    ctaLabel: "LOG MEAL",
    accentColor: "#34D399",
  },
  {
    id: "finance",
    label: "FINANCE",
    thumbnail: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&q=80",
    heroBackground:
      "linear-gradient(135deg, rgba(10,28,64,0.95) 0%, rgba(250,204,21,0.2) 60%, rgba(10,28,64,0.95) 100%)",
    detailTitle: "Capital Growth",
    taskCount: 9,
    statusPrimary: "+12.4%",
    statusSub: "YTD RETURN",
    ctaLabel: "VIEW PORTFOLIO",
    accentColor: "#FACC15",
    href: "/finance",
  },
];

export const DEFAULT_SEGMENT_ID = "work";
