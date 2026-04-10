import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Star, Flame, TrendingUp, Calendar as CalendarIcon, ArrowRight } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

// Dados mockados (depois conectamos com a API real)
const lineData = [
    { name: 'Jan', value: 30 },
    { name: 'Fev', value: 45 },
    { name: 'Mar', value: 38 },
    { name: 'Abr', value: 62 },
    { name: 'Mai', value: 55 },
    { name: 'Jun', value: 78 },
];

const barData = [
    { name: 'Seg', value: 23 },
    { name: 'Ter', value: 45 },
    { name: 'Qua', value: 38 },
    { name: 'Qui', value: 62 },
    { name: 'Sex', value: 55 },
    { name: 'Sáb', value: 78 },
    { name: 'Dom', value: 42 },
];

const calendarDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const calendarDates = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];

const Dashboard: React.FC = () => {
    return (
        <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                style={{ marginBottom: '24px' }}
            >
                <h1 style={{ fontSize: '28px', fontWeight: 'bold' }}>
                    Dashboard <span className="gradient-text">Analytics</span>
                </h1>
                <p style={{ color: '#aaa', marginTop: '8px' }}>Bem-vindo de volta! Aqui estão suas métricas</p>
            </motion.div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '24px' }}>

                {/* Card de Perfil */}
                <motion.div className="glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                    <div style={{ padding: '24px', textAlign: 'center' }}>
                        <div style={{
                            width: '80px',
                            height: '80px',
                            margin: '0 auto 16px',
                            borderRadius: '50%',
                            background: 'linear-gradient(135deg, #ff4ecd, #7b5cff)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '32px',
                            fontWeight: 'bold'
                        }}>
                            MC
                        </div>
                        <div style={{
                            display: 'inline-block',
                            padding: '4px 12px',
                            borderRadius: '20px',
                            background: 'linear-gradient(135deg, #ff4ecd, #7b5cff)',
                            fontSize: '12px',
                            fontWeight: 'bold'
                        }}>
                            ADMIN
                        </div>
                        <h3 style={{ marginTop: '16px' }}>Maria Clara</h3>
                        <p style={{ color: '#aaa', fontSize: '12px' }}>admin@email.com</p>
                    </div>
                </motion.div>

                {/* Card de Métricas */}
                <motion.div className="glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <div style={{ padding: '24px', background: 'linear-gradient(135deg, rgba(123,92,255,0.2), rgba(255,78,205,0.2))', borderRadius: '24px' }}>
                        <h3 style={{ marginBottom: '20px' }}>Métricas Principais</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', textAlign: 'center' }}>
                            <div>
                                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#ff4ecd' }}>23</div>
                                <div style={{ fontSize: '12px', color: '#aaa' }}>Total</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#7b5cff' }}>56</div>
                                <div style={{ fontSize: '12px', color: '#aaa' }}>Ativos</div>
                            </div>
                            <div>
                                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#00c6ff' }}>84</div>
                                <div style={{ fontSize: '12px', color: '#aaa' }}>Concluídos</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Card de Gráfico de Linha */}
                <motion.div className="glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                    <div style={{ padding: '24px' }}>
                        <h3 style={{ marginBottom: '20px' }}>Evolução Mensal</h3>
                        <ResponsiveContainer width="100%" height={200}>
                            <AreaChart data={lineData}>
                                <defs>
                                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#7b5cff" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#ff4ecd" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#aaa" />
                                <YAxis stroke="#aaa" />
                                <Tooltip contentStyle={{ background: '#1a1a4a', border: 'none', borderRadius: '8px' }} />
                                <Area type="monotone" dataKey="value" stroke="#7b5cff" fill="url(#colorGradient)" strokeWidth={2} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Card Grande - Central */}
                <motion.div className="glass-card" style={{ gridColumn: 'span 2' }} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
                    <div style={{ padding: '24px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                            <div>
                                <h4 style={{ marginBottom: '12px' }}>Performance</h4>
                                <ResponsiveContainer width="100%" height={100}>
                                    <LineChart data={lineData.slice(0, 4)}>
                                        <Line type="monotone" dataKey="value" stroke="#7b5cff" strokeWidth={2} dot={{ fill: '#ff4ecd' }} />
                                    </LineChart>
                                </ResponsiveContainer>
                                <div style={{ marginTop: '12px', fontSize: '24px', fontWeight: 'bold' }}>90%</div>
                            </div>
                            <div>
                                <h4 style={{ marginBottom: '12px' }}>Engajamento</h4>
                                <ResponsiveContainer width="100%" height={100}>
                                    <LineChart data={lineData.slice(2, 6)}>
                                        <Line type="monotone" dataKey="value" stroke="#00c6ff" strokeWidth={2} dot={{ fill: '#7b5cff' }} />
                                    </LineChart>
                                </ResponsiveContainer>
                                <div style={{ marginTop: '12px', fontSize: '24px', fontWeight: 'bold' }}>56%</div>
                            </div>
                        </div>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '36px', fontWeight: 'bold', background: 'linear-gradient(135deg, #ff4ecd, #7b5cff)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                                92% Optimal duration
                            </div>
                            <div style={{ marginTop: '16px', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '4px', overflow: 'hidden' }}>
                                <div style={{ width: '92%', height: '100%', background: 'linear-gradient(90deg, #ff4ecd, #7b5cff, #00c6ff)', borderRadius: '4px' }} />
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                                <span>2:53</span>
                                <span>3:35</span>
                                <span>1:32</span>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Card Coração */}
                <motion.div className="glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
                    <div style={{ padding: '24px', textAlign: 'center' }}>
                        <Heart size={32} color="#ff4ecd" style={{ marginBottom: '12px' }} />
                        <div style={{ fontSize: '48px', fontWeight: 'bold' }}>76</div>
                        <ResponsiveContainer width="100%" height={40}>
                            <LineChart data={lineData.slice(0, 5)}>
                                <Line type="monotone" dataKey="value" stroke="#7b5cff" strokeWidth={1.5} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Card Avaliação */}
                <motion.div className="glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                    <div style={{ padding: '24px', textAlign: 'center' }}>
                        <Star size={32} color="#ff4ecd" style={{ marginBottom: '12px' }} />
                        <div style={{ fontSize: '48px', fontWeight: 'bold' }}>54</div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginTop: '12px' }}>
                            {[1, 2, 3, 4, 5].map(i => (
                                <Star key={i} size={16} fill={i <= 3 ? '#ff4ecd' : 'none'} color="#ff4ecd" />
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Card Calendário */}
                <motion.div className="glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
                    <div style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3>October 2024</h3>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff4ecd' }} />
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7b5cff' }} />
                                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#00c6ff' }} />
                            </div>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginBottom: '16px' }}>
                            {calendarDays.map(day => (
                                <div key={day} style={{ textAlign: 'center', fontSize: '12px', color: '#aaa' }}>{day}</div>
                            ))}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '8px', marginBottom: '20px' }}>
                            {calendarDates.slice(0, 28).map(date => (
                                <div key={date} style={{
                                    textAlign: 'center',
                                    padding: '8px',
                                    borderRadius: '50%',
                                    background: date === 15 ? 'linear-gradient(135deg, #ff4ecd, #7b5cff)' : 'transparent',
                                    cursor: 'pointer'
                                }}>
                                    {date}
                                </div>
                            ))}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', textAlign: 'center' }}>
                            <div><div style={{ fontSize: '18px', fontWeight: 'bold' }}>15</div><div style={{ fontSize: '10px', color: '#aaa' }}>Tasks</div></div>
                            <div><div style={{ fontSize: '18px', fontWeight: 'bold' }}>32</div><div style={{ fontSize: '10px', color: '#aaa' }}>Hours</div></div>
                            <div><div style={{ fontSize: '18px', fontWeight: 'bold' }}>46</div><div style={{ fontSize: '10px', color: '#aaa' }}>Points</div></div>
                            <div><div style={{ fontSize: '18px', fontWeight: 'bold' }}>78</div><div style={{ fontSize: '10px', color: '#aaa' }}>Score</div></div>
                        </div>
                    </div>
                </motion.div>

                {/* Card Progresso Circular */}
                <motion.div className="glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                    <div style={{ padding: '24px', textAlign: 'center' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '20px' }}>
                            <div>
                                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'conic-gradient(#ff4ecd 0deg 273deg, rgba(255,255,255,0.1) 273deg 360deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>76%</span>
                                </div>
                                <div style={{ fontSize: '12px', marginTop: '8px' }}>Progresso</div>
                            </div>
                            <div>
                                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'conic-gradient(#7b5cff 0deg 194deg, rgba(255,255,255,0.1) 194deg 360deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>54%</span>
                                </div>
                                <div style={{ fontSize: '12px', marginTop: '8px' }}>Qualidade</div>
                            </div>
                            <div>
                                <div style={{ width: '60px', height: '60px', borderRadius: '50%', background: 'conic-gradient(#00c6ff 0deg 83deg, rgba(255,255,255,0.1) 83deg 360deg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>23%</span>
                                </div>
                                <div style={{ fontSize: '12px', marginTop: '8px' }}>Meta</div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Card Barras Horizontais */}
                <motion.div className="glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
                    <div style={{ padding: '24px' }}>
                        <h3 style={{ marginBottom: '16px' }}>Progresso por Área</h3>
                        {[
                            { label: 'Desenvolvimento', value: 23, color: '#ff4ecd' },
                            { label: 'Design', value: 56, color: '#7b5cff' },
                            { label: 'Marketing', value: 84, color: '#00c6ff' }
                        ].map(item => (
                            <div key={item.label} style={{ marginBottom: '16px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                                    <span style={{ fontSize: '12px' }}>{item.label}</span>
                                    <span style={{ fontSize: '12px', color: item.color }}>{item.value}%</span>
                                </div>
                                <div style={{ height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                                    <div style={{ width: `${item.value}%`, height: '100%', background: item.color, borderRadius: '3px' }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                {/* Card Gráfico de Barras */}
                <motion.div className="glass-card" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
                    <div style={{ padding: '24px' }}>
                        <h3 style={{ marginBottom: '16px' }}>Atividade Semanal</h3>
                        <ResponsiveContainer width="100%" height={150}>
                            <BarChart data={barData}>
                                <XAxis dataKey="name" stroke="#aaa" fontSize={10} />
                                <YAxis hide />
                                <Tooltip contentStyle={{ background: '#1a1a4a', border: 'none' }} />
                                <Bar dataKey="value" fill="#7b5cff" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Botão CTA */}
                <motion.button
                    className="glass-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1 }}
                    whileHover={{ scale: 1.02 }}
                    style={{
                        gridColumn: 'span 3',
                        padding: '20px',
                        background: 'linear-gradient(135deg, #ff4ecd, #7b5cff)',
                        border: 'none',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        fontWeight: 'bold'
                    }}
                >
                    <span>CLICK to learn more</span>
                    <ArrowRight size={24} />
                </motion.button>
            </div>
        </div>
    );
};

export default Dashboard;