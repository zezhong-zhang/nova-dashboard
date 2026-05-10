"use client";

import { useState, useEffect } from "react";
import Head from "next/head";

// NOVA 技术情报仪表盘 - 基于 DeerFlow 2 架构
// 部署: next build + next start (端口3000)

interface TechCard {
  rank: number;
  name: string;
  grade: string;
  score: number;
  tam: { T: number; A: number; M: number; D: number };
  evidence: string[];
  disruption: string;
  entry: string;
}

interface SocialSignal {
  platform: string;
  author: string;
  content: string;
  engagement: number;
  keywords: string[];
  isBreakthrough: boolean;
  time: string;
}

const MOCK_TECHS: TechCard[] = [
  {
    rank: 1,
    name: "推理型大语言模型",
    grade: "S级",
    score: 8.8,
    tam: { T: 9, A: 9, M: 8, D: 9 },
    evidence: ["DeepSeek-R1: $6M训练成本对标GPT-4", "OpenAI o3: ARC-AGI突破", "Claude 3.7: 混合推理"],
    disruption: "AI从知识检索进化为深度推理，替代初级研究员/程序员",
    entry: "已发生，2025Q1关键窗口",
  },
  {
    rank: 2,
    name: "量子计算实用化",
    grade: "A级",
    score: 7.2,
    tam: { T: 8, A: 6, M: 5, D: 10 },
    evidence: ["Google Willow: 105量子比特纠错", "IBM Heron: 错误率降10倍", "祖冲之三号: 176比特"],
    disruption: "密码学重构、药物发现加速、金融建模革命",
    entry: "2026-2027关键窗口",
  },
  {
    rank: 3,
    name: "人形机器人量产",
    grade: "A级",
    score: 7.5,
    tam: { T: 7, A: 8, M: 6, D: 9 },
    evidence: ["宇树H1: ¥9.9万定价", "特斯拉Optimus: 2025量产5000台", "Figure AI: 宝马工厂部署"],
    disruption: "制造业劳动力成本下降50%，机器人红利替代人口红利",
    entry: "2025-2026量产验证期",
  },
  {
    rank: 4,
    name: "AI蛋白质设计",
    grade: "A级",
    score: 7.8,
    tam: { T: 9, A: 7, M: 6, D: 9 },
    evidence: ["2024诺奖: AlphaFold3", "Profluent: 开源CRISPR设计器", "临床管线数十条"],
    disruption: "药物研发周期从10年缩短至2-3年，个性化基因治疗",
    entry: "2024-2025临床验证期",
  },
  {
    rank: 5,
    name: "核聚变能源",
    grade: "A级",
    score: 6.5,
    tam: { T: 7, A: 5, M: 4, D: 10 },
    evidence: ["Commonwealth: 20T超导磁体", "Helion: 微软50MW采购协议", "NIF: 净能量增益"],
    disruption: "能源成本趋近于零，化石能源退出，地缘格局重构",
    entry: "2030年前示范电站",
  },
];

const MOCK_SOCIAL: SocialSignal[] = [
  { platform: "x", author: "karpathy", content: "DeepSeek-R1 just dropped. $6M training cost, performance matching GPT-4...", engagement: 15420, keywords: ["DeepSeek", "LLM"], isBreakthrough: true, time: "2h ago" },
  { platform: "reddit", author: "r/MachineLearning", content: "New SOTA on MMLU: 92.3% with 7B parameter model", engagement: 3400, keywords: ["MMLU", "SOTA"], isBreakthrough: false, time: "5h ago" },
  { platform: "hackernews", author: "google-research", content: "Willow chip achieves below-threshold error correction", engagement: 892, keywords: ["quantum", "Willow"], isBreakthrough: true, time: "8h ago" },
  { platform: "github", author: "deepseek-ai", content: "DeepSeek-V3 released: 671B MoE, $5.6M training cost", engagement: 12500, keywords: ["DeepSeek", "MoE"], isBreakthrough: true, time: "1d ago" },
];

export default function NOVADashboard() {
  const [activeTab, setActiveTab] = useState<"techs" | "social" | "about">("techs");
  const [selectedTech, setSelectedTech] = useState<TechCard | null>(null);

  const renderTechCard = (tech: TechCard) => (
    <div
      key={tech.rank}
      className="bg-[#111] border border-[#333] rounded-xl p-4 mb-3 cursor-pointer active:scale-[0.98] transition-transform"
      onClick={() => setSelectedTech(tech)}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className={`text-lg font-bold ${tech.grade === "S级" ? "text-yellow-400" : "text-blue-400"}`}>
            #{tech.rank}
          </span>
          <span className="text-white font-semibold text-sm">{tech.name}</span>
        </div>
        <span className={`text-xs px-2 py-1 rounded-full ${tech.grade === "S级" ? "bg-yellow-400/20 text-yellow-400" : "bg-blue-400/20 text-blue-400"}`}>
          {tech.grade}
        </span>
      </div>
      
      <div className="flex gap-1 mb-2">
        {["T", "A", "M", "D"].map((dim) => (
          <div key={dim} className="flex-1">
            <div className="flex justify-between text-[10px] text-gray-500 mb-1">
              <span>{dim}</span>
              <span>{tech.tam[dim as keyof typeof tech.tam]}/10</span>
            </div>
            <div className="h-1.5 bg-[#222] rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${dim === "D" ? "bg-red-400" : "bg-blue-400"}`}
                style={{ width: `${tech.tam[dim as keyof typeof tech.tam] * 10}%` }}
              />
            </div>
          </div>
        ))}
      </div>
      
      <div className="text-xs text-gray-400">
        均分: <span className="text-white font-bold">{tech.score}</span>/10
      </div>
    </div>
  );

  const renderSocialCard = (signal: SocialSignal) => (
    <div
      key={signal.content.slice(0, 20)}
      className={`bg-[#111] border rounded-xl p-4 mb-3 ${signal.isBreakthrough ? "border-yellow-400/50" : "border-[#333]"}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">
          {signal.platform === "x" && "𝕏"}
          {signal.platform === "reddit" && "🤖"}
          {signal.platform === "hackernews" && "📰"}
          {signal.platform === "github" && "⚡"}
        </span>
        <span className="text-sm text-gray-300 font-medium">{signal.author}</span>
        <span className="text-xs text-gray-600 ml-auto">{signal.time}</span>
      </div>
      <p className="text-sm text-gray-300 mb-2 line-clamp-3">{signal.content}</p>
      <div className="flex items-center gap-3">
        <span className="text-xs text-gray-500">🔥 {signal.engagement.toLocaleString()}</span>
        <div className="flex gap-1">
          {signal.keywords.map((kw) => (
            <span key={kw} className="text-[10px] px-2 py-0.5 bg-[#222] text-blue-400 rounded-full">
              {kw}
            </span>
          ))}
        </div>
        {signal.isBreakthrough && (
          <span className="text-[10px] px-2 py-0.5 bg-yellow-400/20 text-yellow-400 rounded-full ml-auto">
            🚨 突破
          </span>
        )}
      </div>
    </div>
  );

  return (
    <>
      <Head>
        <title>NOVA - 突破性技术情报局</title>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0" />
        <meta name="theme-color" content="#0a0a0a" />
      </Head>

      <div className="min-h-screen bg-[#0a0a0a] text-white">
        {/* Header */}
        <header className="sticky top-0 z-50 bg-[#0a0a0a]/95 backdrop-blur border-b border-[#222] px-4 py-3">
          <div className="flex items-center justify-between max-w-lg mx-auto">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-sm font-bold">
                N
              </div>
              <div>
                <h1 className="text-sm font-bold leading-tight">NOVA</h1>
                <p className="text-[10px] text-gray-500">突破性技术情报局</p>
              </div>
            </div>
            <div className="text-xs text-gray-500">
              {new Date().toLocaleDateString("zh-CN", { month: "short", day: "numeric" })}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-lg mx-auto px-4 py-4 pb-24">
          {activeTab === "techs" && (
            <>
              {/* Summary Card */}
              <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 border border-blue-500/30 rounded-xl p-4 mb-4">
                <h2 className="text-sm font-bold mb-2">2025年度突破性技术</h2>
                <div className="flex justify-between text-center">
                  <div>
                    <div className="text-2xl font-bold text-yellow-400">1</div>
                    <div className="text-[10px] text-gray-400">S级空降</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-400">4</div>
                    <div className="text-[10px] text-gray-400">A级突破</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">53</div>
                    <div className="text-[10px] text-gray-400">今日信号</div>
                  </div>
                </div>
              </div>

              {/* Tech List */}
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                Top 5 突破性技术
              </h3>
              {MOCK_TECHS.map(renderTechCard)}
            </>
          )}

          {activeTab === "social" && (
            <>
              <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                实时社交媒体信号
              </h3>
              {MOCK_SOCIAL.map(renderSocialCard)}
            </>
          )}

          {activeTab === "about" && (
            <div className="text-center py-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                N
              </div>
              <h2 className="text-lg font-bold mb-2">NOVA 突破性技术情报局</h2>
              <p className="text-sm text-gray-400 mb-6">
                Breakthrough Technology Intelligence Agency
              </p>
              
              <div className="bg-[#111] border border-[#333] rounded-xl p-4 mb-4 text-left">
                <h3 className="text-sm font-bold mb-2">系统能力</h3>
                <ul className="text-xs text-gray-400 space-y-2">
                  <li>• 10个学术数据源实时采集</li>
                  <li>• 5个社交媒体平台监控</li>
                  <li>• TAM四滤网技术评估</li>
                  <li>• 多维度决策反思引擎</li>
                  <li>• 每日自动推送飞书日报</li>
                </ul>
              </div>

              <div className="bg-[#111] border border-[#333] rounded-xl p-4 text-left">
                <h3 className="text-sm font-bold mb-2">数据源</h3>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-400">
                  <span>World Bank</span>
                  <span>OpenAlex</span>
                  <span>arXiv</span>
                  <span>Semantic Scholar</span>
                  <span>Crossref</span>
                  <span>DBLP</span>
                  <span>NASA</span>
                  <span>UN Data</span>
                  <span>X/Twitter</span>
                  <span>Reddit</span>
                  <span>HackerNews</span>
                  <span>GitHub</span>
                </div>
              </div>
            </div>
          )}
        </main>

        {/* Tech Detail Modal */}
        {selectedTech && (
          <div
            className="fixed inset-0 z-[100] bg-black/80 flex items-end"
            onClick={() => setSelectedTech(null)}
          >
            <div
              className="bg-[#111] border-t border-[#333] rounded-t-2xl w-full max-w-lg mx-auto p-6 max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-12 h-1 bg-[#333] rounded-full mx-auto mb-4" />
              
              <div className="flex items-center gap-2 mb-4">
                <span className={`text-2xl font-bold ${selectedTech.grade === "S级" ? "text-yellow-400" : "text-blue-400"}`}>
                  #{selectedTech.rank}
                </span>
                <div>
                  <h2 className="text-lg font-bold">{selectedTech.name}</h2>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${selectedTech.grade === "S级" ? "bg-yellow-400/20 text-yellow-400" : "bg-blue-400/20 text-blue-400"}`}>
                    {selectedTech.grade}
                  </span>
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">TAM 四滤网</h3>
                <div className="space-y-2">
                  {Object.entries(selectedTech.tam).map(([dim, score]) => (
                    <div key={dim} className="flex items-center gap-3">
                      <span className="text-xs text-gray-400 w-20">
                        {dim === "T" && "技术可行性"}
                        {dim === "A" && "应用爆发"}
                        {dim === "M" && "成熟度"}
                        {dim === "D" && "颠覆性"}
                      </span>
                      <div className="flex-1 h-2 bg-[#222] rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${dim === "D" ? "bg-red-400" : "bg-blue-400"}`}
                          style={{ width: `${score * 10}%` }}
                        />
                      </div>
                      <span className="text-xs text-white w-8 text-right">{score}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">关键证据</h3>
                <ul className="space-y-2">
                  {selectedTech.evidence.map((ev, i) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-blue-400 mt-0.5">•</span>
                      {ev}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mb-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">颠覆性影响</h3>
                <p className="text-sm text-gray-300">{selectedTech.disruption}</p>
              </div>

              <div className="mb-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase mb-2">入场时机</h3>
                <p className="text-sm text-yellow-400">{selectedTech.entry}</p>
              </div>

              <button
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-medium active:bg-blue-700 transition-colors"
                onClick={() => setSelectedTech(null)}
              >
                关闭
              </button>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <nav className="fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur border-t border-[#222] z-50">
          <div className="max-w-lg mx-auto flex justify-around py-2">
            {[
              { id: "techs" as const, label: "技术", icon: "🔬" },
              { id: "social" as const, label: "信号", icon: "📡" },
              { id: "about" as const, label: "关于", icon: "ℹ️" },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`flex flex-col items-center gap-0.5 px-6 py-1 rounded-lg transition-colors ${
                  activeTab === tab.id ? "text-blue-400" : "text-gray-500"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <span className="text-lg">{tab.icon}</span>
                <span className="text-[10px]">{tab.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
}
