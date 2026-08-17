"use client";

import { useMemo, useState } from "react";

type Language = "ar" | "en";
type ScenarioId = "balanced" | "energy" | "throughput";

const copy = {
  ar: {
    eyebrow: "MMSI™ · الإصدار الأولي التشغيلي",
    title: "ذكاء القرار الصناعي قبل التنفيذ",
    intro:
      "لوحة تشغيل أولية تحول إشارات المصنع إلى قرار قابل للمراجعة، مع بوابة سلامة تمنع اعتماد أي توصية قبل اكتمال شروطها.",
    simulation: "بيانات محاكاة للعرض",
    language: "English",
    run: "تشغيل محاكاة محكومة",
    running: "جاري تشغيل السيناريو...",
    production: "الإنتاجية الحالية",
    energy: "كثافة الطاقة",
    quality: "مردود الجودة",
    safety: "بوابة السلامة",
    stable: "مستقر",
    ready: "جاهز للمراجعة",
    hold: "إيقاف وقائي",
    overview: "قراءة تشغيلية",
    last24: "آخر 24 ساعة · عينة محاكاة",
    output: "مؤشر الإنتاج",
    energyTrend: "كثافة الطاقة",
    decisionGate: "بوابة القرار",
    gateSubtitle: "لا تنفيذ تلقائياً في هذه النسخة",
    dataCheck: "سلامة البيانات",
    causalCheck: "التحقق السببي",
    complianceCheck: "حدود الامتثال",
    passed: "مستوفى",
    review: "مراجعة مطلوبة",
    recommendation: "التوصية المقترحة",
    scenarioTitle: "مختبر السيناريوهات",
    scenarioSubtitle: "اختبر أثر القرار قبل إرساله إلى بيئة المصنع",
    balanced: "توازن الإنتاج والطاقة",
    energyScenario: "خفض كثافة الطاقة",
    throughputScenario: "رفع الإنتاجية",
    expected: "الأثر المتوقع",
    noActuation: "لا يوجد اتصال تحكم فعلي",
    apply: "اعتماد للمراجعة",
    applied: "أضيفت إلى سجل المراجعة",
    causalTitle: "سلسلة العلاقة السببية",
    causalSubtitle: "مسار تفسير مختصر للتوصية الحالية",
    temperature: "الحرارة",
    pressure: "الضغط",
    energyNode: "الطاقة",
    qualityNode: "الجودة",
    controls: "ضوابط المنصة",
    audit: "سجل تدقيق كامل",
    explanation: "تفسير هندسي لكل توصية",
    failClosed: "إغلاق عند الفشل",
    economic: "أثر اقتصادي قابل للقياس",
    footer:
      "MMSI™ · نموذج أولي تشغيلي · البيانات المعروضة محاكاة وليست بيانات مصنع حقيقية · لا تصدر هذه النسخة أوامر تحكم فعلية.",
  },
  en: {
    eyebrow: "MMSI™ · OPERATIONAL MVP",
    title: "Industrial decision intelligence before execution",
    intro:
      "A first operational slice that turns plant signals into reviewable decisions, with a safety gate that blocks recommendations until their conditions are satisfied.",
    simulation: "Synthetic demonstration data",
    language: "العربية",
    run: "Run governed simulation",
    running: "Running scenario...",
    production: "Current throughput",
    energy: "Energy intensity",
    quality: "Quality yield",
    safety: "Safety gate",
    stable: "Stable",
    ready: "Review ready",
    hold: "Fail-closed hold",
    overview: "Operational view",
    last24: "Last 24 hours · synthetic sample",
    output: "Throughput index",
    energyTrend: "Energy intensity",
    decisionGate: "Decision gate",
    gateSubtitle: "No automatic actuation in this release",
    dataCheck: "Data integrity",
    causalCheck: "Causal validation",
    complianceCheck: "Compliance bounds",
    passed: "Passed",
    review: "Review required",
    recommendation: "Recommended action",
    scenarioTitle: "Scenario lab",
    scenarioSubtitle: "Test decision impact before sending it to a plant environment",
    balanced: "Balance throughput and energy",
    energyScenario: "Reduce energy intensity",
    throughputScenario: "Increase throughput",
    expected: "Expected impact",
    noActuation: "No live control connection",
    apply: "Submit for review",
    applied: "Added to review log",
    causalTitle: "Causal relationship chain",
    causalSubtitle: "A compact explanation path for the current recommendation",
    temperature: "Temperature",
    pressure: "Pressure",
    energyNode: "Energy",
    qualityNode: "Quality",
    controls: "Platform controls",
    audit: "Full audit trail",
    explanation: "Engineering explanation per recommendation",
    failClosed: "Fail-closed governance",
    economic: "Measurable economic impact",
    footer:
      "MMSI™ · Operational prototype · Displayed data is synthetic and not plant data · This release does not issue live control commands.",
  },
} as const;

const trend = [
  { label: "00", output: 58, energy: 71 },
  { label: "04", output: 62, energy: 66 },
  { label: "08", output: 74, energy: 61 },
  { label: "12", output: 78, energy: 58 },
  { label: "16", output: 81, energy: 55 },
  { label: "20", output: 76, energy: 60 },
];

const scenarios: Record<ScenarioId, { impact: string; impactEn: string; recommendation: string; recommendationEn: string }> = {
  balanced: {
    impact: "زيادة إنتاجية 4.8% مع خفض كثافة الطاقة 3.1%",
    impactEn: "4.8% throughput uplift with 3.1% lower energy intensity",
    recommendation: "خفض نقطة ضبط الحرارة تدريجياً ضمن حدود الجودة ومراقبة الضغط خلال دورة التحقق.",
    recommendationEn: "Gradually lower the temperature setpoint within quality limits while monitoring pressure through the validation cycle.",
  },
  energy: {
    impact: "خفض كثافة الطاقة 7.2% مع أثر إنتاجي محدود",
    impactEn: "7.2% lower energy intensity with limited throughput impact",
    recommendation: "تفعيل مسار كفاءة الطاقة المقترح بعد اعتماد مهندس التشغيل ومراجعة حدود السلامة.",
    recommendationEn: "Activate the proposed energy-efficiency path after operations approval and safety-bound review.",
  },
  throughput: {
    impact: "زيادة إنتاجية 8.6% مع ارتفاع مراقب في استهلاك الطاقة",
    impactEn: "8.6% throughput uplift with a controlled energy increase",
    recommendation: "رفع معدل التغذية على مراحل مع إبقاء مؤشر الجودة وبوابة الضغط تحت المراقبة.",
    recommendationEn: "Increase feed rate in stages while keeping quality indicators and the pressure gate under observation.",
  },
};

function MetricCard({ label, value, detail, tone }: { label: string; value: string; detail: string; tone: string }) {
  return (
    <article className={`metric-card ${tone}`}>
      <div className="metric-label">{label}</div>
      <div className="metric-value">{value}</div>
      <div className="metric-detail">{detail}</div>
    </article>
  );
}

export default function Home() {
  const [lang, setLang] = useState<Language>("ar");
  const [scenario, setScenario] = useState<ScenarioId>("balanced");
  const [running, setRunning] = useState(false);
  const [applied, setApplied] = useState(false);
  const t = copy[lang];
  const selected = scenarios[scenario];
  const direction = lang === "ar" ? "rtl" : "ltr";
  const recommendation = lang === "ar" ? selected.recommendation : selected.recommendationEn;
  const impact = lang === "ar" ? selected.impact : selected.impactEn;

  const scenarioLabel = useMemo(() => {
    if (scenario === "energy") return t.energyScenario;
    if (scenario === "throughput") return t.throughputScenario;
    return t.balanced;
  }, [scenario, t]);

  function runSimulation() {
    setRunning(true);
    setApplied(false);
    window.setTimeout(() => setRunning(false), 850);
  }

  return (
    <main className="mmsi-app" dir={direction}>
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <div className="mmsi-container">
        <header className="topbar">
          <div className="brand-lockup">
            <div className="brand-mark">M</div>
            <div>
              <div className="brand-name">MMSI<span>™</span></div>
              <div className="brand-subtitle">Industrial Decision Intelligence</div>
            </div>
          </div>
          <div className="topbar-actions">
            <span className="data-pill"><i /> {t.simulation}</span>
            <button className="language-button" onClick={() => setLang(lang === "ar" ? "en" : "ar")}>
              {t.language}
            </button>
          </div>
        </header>

        <section className="hero-section">
          <div className="hero-copy">
            <p className="eyebrow">{t.eyebrow}</p>
            <h1>{t.title}</h1>
            <p className="hero-intro">{t.intro}</p>
            <button className="primary-button" onClick={runSimulation} disabled={running}>
              <span className="button-icon">{running ? "…" : "▶"}</span>
              {running ? t.running : t.run}
            </button>
          </div>
          <div className="hero-status">
            <div className="status-orbit orbit-one" />
            <div className="status-orbit orbit-two" />
            <div className="status-core">
              <span className="core-dot" />
              <strong>{t.ready}</strong>
              <small>PRE-EXECUTION</small>
            </div>
          </div>
        </section>

        <section className="metrics-grid" aria-label={t.overview}>
          <MetricCard label={t.production} value="78.4" detail="index / 100 · +4.8%" tone="teal" />
          <MetricCard label={t.energy} value="61.2" detail="kWh / unit · −3.1%" tone="amber" />
          <MetricCard label={t.quality} value="98.1%" detail="within target window" tone="blue" />
          <MetricCard label={t.safety} value={t.stable} detail={t.ready} tone="green" />
        </section>

        <section className="dashboard-grid">
          <article className="panel chart-panel">
            <div className="panel-heading">
              <div>
                <p className="panel-kicker">{t.overview}</p>
                <h2>{t.last24}</h2>
              </div>
              <span className="live-badge"><i /> LIVE MODEL</span>
            </div>
            <div className="chart-legend">
              <span><i className="legend-output" /> {t.output}</span>
              <span><i className="legend-energy" /> {t.energyTrend}</span>
            </div>
            <div className="bar-chart" role="img" aria-label={t.last24}>
              {trend.map((point) => (
                <div className="bar-group" key={point.label}>
                  <div className="bar-track">
                    <div className="bar output-bar" style={{ height: `${point.output}%` }} />
                    <div className="bar energy-bar" style={{ height: `${point.energy}%` }} />
                  </div>
                  <span>{point.label}</span>
                </div>
              ))}
            </div>
            <div className="chart-footnote"><span>↑ 4.8%</span> {lang === "ar" ? "تحسن تشغيلي مرصود في العينة" : "observed operating improvement in sample"}</div>
          </article>

          <article className="panel gate-panel">
            <div className="panel-heading">
              <div>
                <p className="panel-kicker">{t.decisionGate}</p>
                <h2>{t.gateSubtitle}</h2>
              </div>
              <span className="shield-icon">✓</span>
            </div>
            <div className="gate-list">
              <div className="gate-row"><span className="gate-index">01</span><span>{t.dataCheck}</span><strong>{t.passed}</strong></div>
              <div className="gate-row"><span className="gate-index">02</span><span>{t.causalCheck}</span><strong>{t.passed}</strong></div>
              <div className="gate-row hold-row"><span className="gate-index">03</span><span>{t.complianceCheck}</span><strong>{t.review}</strong></div>
            </div>
            <div className="hold-banner"><span>!</span><div><strong>{t.hold}</strong><small>{t.noActuation}</small></div></div>
          </article>
        </section>

        <section className="panel scenario-panel">
          <div className="panel-heading scenario-heading">
            <div>
              <p className="panel-kicker">{t.scenarioTitle}</p>
              <h2>{t.scenarioSubtitle}</h2>
            </div>
            <span className="scenario-number">03</span>
          </div>
          <div className="scenario-body">
            <div className="scenario-options">
              {(["balanced", "energy", "throughput"] as ScenarioId[]).map((id) => (
                <button key={id} className={`scenario-option ${scenario === id ? "selected" : ""}`} onClick={() => { setScenario(id); setApplied(false); }}>
                  <span className="option-radio" />
                  <span>{id === "balanced" ? t.balanced : id === "energy" ? t.energyScenario : t.throughputScenario}</span>
                </button>
              ))}
            </div>
            <div className="recommendation-card">
              <div className="recommendation-top"><span>{t.recommendation}</span><span className="review-tag">{t.ready}</span></div>
              <h3>{scenarioLabel}</h3>
              <p>{recommendation}</p>
              <div className="impact-line"><span>{t.expected}</span><strong>{impact}</strong></div>
              <button className="secondary-button" onClick={() => setApplied(true)}>{applied ? `✓ ${t.applied}` : t.apply}</button>
            </div>
          </div>
        </section>

        <section className="panel causal-panel">
          <div className="panel-heading">
            <div>
              <p className="panel-kicker">{t.causalTitle}</p>
              <h2>{t.causalSubtitle}</h2>
            </div>
            <span className="causal-label">CAUSAL PATH</span>
          </div>
          <div className="causal-chain">
            {[t.temperature, t.pressure, t.energyNode, t.qualityNode].map((node, index) => (
              <div className="causal-step" key={node}>
                <div className={`causal-node node-${index + 1}`}><span>{String(index + 1).padStart(2, "0")}</span>{node}</div>
                {index < 3 && <div className="causal-arrow">{lang === "ar" ? "←" : "→"}</div>}
              </div>
            ))}
          </div>
        </section>

        <section className="controls-section">
          <div className="controls-heading"><p className="panel-kicker">{t.controls}</p><h2>{lang === "ar" ? "القرار يبقى قابلاً للتفسير والتدقيق" : "The decision remains explainable and auditable"}</h2></div>
          <div className="control-grid">
            {[t.audit, t.explanation, t.failClosed, t.economic].map((label, index) => (
              <div className="control-item" key={label}><span className="control-check">✓</span><div><strong>{label}</strong><small>{index === 2 ? t.hold : t.passed}</small></div></div>
            ))}
          </div>
        </section>

        <footer className="mmsi-footer">{t.footer}</footer>
      </div>
    </main>
  );
}
