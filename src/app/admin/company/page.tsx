'use client';

import { useState } from 'react';
import BasicInfoTab from './components/BasicInfoTab';
import TimelineTab from './components/TimelineTab';
import CertificatesTab from './components/CertificatesTab';
import CoreValuesTab from './components/CoreValuesTab';
import CultureTab from './components/CultureTab';

const tabs = [
  { id: 'basic', name: '기본 정보', icon: '🏢' },
  { id: 'timeline', name: '기업 연혁', icon: '📅' },
  { id: 'certificates', name: '인증서', icon: '🏆' },
  { id: 'core-values', name: '핵심가치', icon: '💎' },
  { id: 'culture', name: '사내문화', icon: '🌱' },
];

export default function AdminCompanyPage() {
  const [activeTab, setActiveTab] = useState('basic');

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">회사 정보 관리</h1>
        <p className="text-gray-600 mt-1">웹사이트에 표시될 회사 정보를 관리합니다</p>
      </div>

      {/* Tabs Navigation */}
      <div className="border-b border-gray-200 mb-6">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-3 font-medium text-sm border-b-2 transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {activeTab === 'basic' && <BasicInfoTab />}
        {activeTab === 'timeline' && <TimelineTab />}
        {activeTab === 'certificates' && <CertificatesTab />}
        {activeTab === 'core-values' && <CoreValuesTab />}
        {activeTab === 'culture' && <CultureTab />}
      </div>
    </div>
  );
}
