"use client"
import React, { useState } from 'react';
import Profile from '../profile';
import Password from '@/app/components/password';
import Logout from '@/app/components/logout';


export default function MAIN() {
  const [activeTab, setActiveTab] = useState('001');

  const changeActiveTab = (tabID: React.SetStateAction<string>) => {
    setActiveTab(tabID);
  };
  return (
    <>
      <main id="content" role="main">
        <nav className="sticky -top-px bg-white text-sm font-medium text-black ring-1 ring-gray-900 ring-opacity-5 shadow-sm shadow-gray-100 -mt-px" aria-label="Jump links">
          <div className="grid h-15 max-w-lg grid-cols-5 mx-auto">
            <button
              data-tooltip-target="tooltip-home"
              type="button"
              data-tab="001"
              className={`inline-flex flex-col items-center justify-center p-3 hover:bg-gray-50 ${
                activeTab === '001'
              }`}
              onClick={() => changeActiveTab('001')}
            >
              <div className="h-6 w-6">
                <svg className="w-[25px] h-[25px] fill-[#81d8d0]" viewBox="0 0 576 576" xmlns="http://www.w3.org/2000/svg">
                <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"></path>
                </svg>
              </div>
            </button>

            <button
              data-tooltip-target="tooltip-settings"
              type="button"
              data-tab="002"
              className={`inline-flex flex-col items-center justify-center p-3 hover:bg-gray-50 ${
                activeTab === '002'
              }`}
              onClick={() => changeActiveTab('002')}
            >
              <div className="h-6 w-6">
                <svg className="w-[25px] h-[25px] fill-[#81d8d0]" viewBox="0 0 576 576" xmlns="http://www.w3.org/2000/svg">
                <path d="M64 64C28.7 64 0 92.7 0 128v64c0 8.8 7.4 15.7 15.7 18.6C34.5 217.1 48 235 48 256s-13.5 38.9-32.3 45.4C7.4 304.3 0 311.2 0 320v64c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V320c0-8.8-7.4-15.7-15.7-18.6C541.5 294.9 528 277 528 256s13.5-38.9 32.3-45.4c8.3-2.9 15.7-9.8 15.7-18.6V128c0-35.3-28.7-64-64-64H64zm64 112l0 160c0 8.8 7.2 16 16 16H432c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H144c-8.8 0-16 7.2-16 16zM96 160c0-17.7 14.3-32 32-32H448c17.7 0 32 14.3 32 32V352c0 17.7-14.3 32-32 32H128c-17.7 0-32-14.3-32-32V160z"></path>
                </svg>
              </div>
            </button>

            <button
              data-tooltip-target="tooltip-settings"
              type="button"
              data-tab="003"
              className={`inline-flex flex-col items-center justify-center p-3 hover:bg-gray-50 ${
                activeTab === '003'
              }`}
              onClick={() => changeActiveTab('003')}
            >
              <div className="h-6 w-6">
                <svg className="w-[25px] h-[25px] fill-[#81d8d0]" viewBox="0 0 576 576" xmlns="http://www.w3.org/2000/svg">
                <path d="M416 0C400 0 288 32 288 176V288c0 35.3 28.7 64 64 64h32V480c0 17.7 14.3 32 32 32s32-14.3 32-32V352 240 32c0-17.7-14.3-32-32-32zM64 16C64 7.8 57.9 1 49.7 .1S34.2 4.6 32.4 12.5L2.1 148.8C.7 155.1 0 161.5 0 167.9c0 45.9 35.1 83.6 80 87.7V480c0 17.7 14.3 32 32 32s32-14.3 32-32V255.6c44.9-4.1 80-41.8 80-87.7c0-6.4-.7-12.8-2.1-19.1L191.6 12.5c-1.8-8-9.3-13.3-17.4-12.4S160 7.8 160 16V150.2c0 5.4-4.4 9.8-9.8 9.8c-5.1 0-9.3-3.9-9.8-9L127.9 14.6C127.2 6.3 120.3 0 112 0s-15.2 6.3-15.9 14.6L83.7 151c-.5 5.1-4.7 9-9.8 9c-5.4 0-9.8-4.4-9.8-9.8V16zm48.3 152l-.3 0-.3 0 .3-.7 .3 .7z"></path>
                </svg>
              </div>
            </button>

            <button
              data-tooltip-target="tooltip-settings"
              type="button"
              data-tab="004"
              className={`inline-flex flex-col items-center justify-center p-3 hover:bg-gray-50 ${
                activeTab === '004'
              }`}
              onClick={() => changeActiveTab('004')}
            >
              <div className="h-6 w-6">
                <svg className="w-[25px] h-[25px] fill-[#81d8d0]" viewBox="0 0 476 576" xmlns="http://www.w3.org/2000/svg">
                <path d="M160 112c0-35.3 28.7-64 64-64s64 28.7 64 64v48H160V112zm-48 48H48c-26.5 0-48 21.5-48 48V416c0 53 43 96 96 96H352c53 0 96-43 96-96V208c0-26.5-21.5-48-48-48H336V112C336 50.1 285.9 0 224 0S112 50.1 112 112v48zm24 48a24 24 0 1 1 0 48 24 24 0 1 1 0-48zm152 24a24 24 0 1 1 48 0 24 24 0 1 1 -48 0z"></path>
                </svg>
              </div>
            </button>

            <button
              data-tooltip-target="tooltip-settings"
              type="button"
              data-tab="005"
              className={`inline-flex flex-col items-center justify-center p-3 hover:bg-gray-50 ${
                activeTab === '005'
              }`}
              onClick={() => changeActiveTab('005')}
            >
              <div className="h-6 w-6">
                <svg className="w-[25px] h-[25px] fill-[#81d8d0]" viewBox="0 0 576 576" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z"></path>
                </svg>
              </div>
            </button>
          </div>
        </nav>

        <div className="bg-fixed h-screen flex items-center justify-center" style={{ backgroundImage: 'url("bg_water.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', height: '100vh' }}>
          
          <div className={activeTab === '001' ? 'block' : 'hidden'} id="001">
            PAGE1
          </div>

          <div className={activeTab === '002' ? 'block' : 'hidden'} id="002">
            PAGE2
          </div>

          <div className={activeTab === '003' ? 'block' : 'hidden'} id="003">
            PAGE3
          </div>

          <div className={activeTab === '004' ? 'block' : 'hidden'} id="004">
            PAGE4
          </div>

          <div className={activeTab === '005' ? 'block' : 'hidden'} id="005">
              <Profile />
              <Password />
              <Logout />
          </div>

        </div>
      </main>
    </>
  );
}