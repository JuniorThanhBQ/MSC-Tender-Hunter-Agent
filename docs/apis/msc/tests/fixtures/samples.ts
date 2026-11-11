/* SPDX-License-Identifier: MPL-2.0 */

export const searchResponse = {
  page: {
    content: [
      {
        id: "00000000-0000-4000-8000-000000000001",
        notifyId: "00000000-0000-4000-8000-000000000001",
        notifyNo: "IB2600XXXXXX",
        notifyVersion: "00",
        notifyNoStand: "IB2600XXXXXX-00",
        bidName: ["Mua sắm trang thiết bị y tế"],
        investorName: "REDACTED",
        investorCode: "REDACTED",
        publicDate: "2026-11-10T10:44:54.66",
        originalPublicDate: "2026-11-10T10:44:54.66",
        bidCloseDate: "2026-11-19T10:10:00",
        bidOpenDate: "2026-11-19T10:10:00",
        bidForm: "DTRR",
        bidMode: "1_MTHS",
        investField: ["HH"],
        isInternet: 1,
        locations: [
          {
            provCode: "66",
            provName: "Tỉnh Đắk Lắk",
            districtCode: "22207",
            districtName: "Xã Sông Hinh"
          }
        ],
        processApply: "LDT",
        status: "01",
        statusForNotify: "",
        planType: "TX",
        planNo: "PL2600XXXXXX",
        stepCode: "notify-contractor-step-1-tbmt",
        type: "es-notify-contractor",
        numPetition: 0,
        numClarifyReq: 0,
        numBidderTech: 0,
        bidId: "00000000-0000-4000-8000-000000000002",
        bidPrice: [1678200000],
        score: "NaN",
        isDomestic: 1
      }
    ]
  }
};

export const categoryResponse = {
  categories: {
    DM_BAOGIA: [
      {
        code: "THUOC",
        name: "Gói thầu mua thuốc",
        nameEn: "Drug purchase package",
        categoryTypeCode: "DM_BAOGIA"
      }
    ],
    DM_HT_BAOGIA: [
      {
        code: "OFFLINE",
        name: "Trực tiếp",
        nameEn: "Offline",
        categoryTypeCode: "DM_HT_BAOGIA"
      }
    ]
  }
};

export const areaResponse = {
  areas: [
    {
      code: "01",
      areaType: "1",
      name: "Thành phố Hà Nội",
      nameTranslate: "Hanoi City",
      orderIndex: 690,
      status: 1,
      parentCode: "VN",
      parent: null,
      parentDTO: null,
      groupCode: "MB",
      createdDate: "2025-06-21T02:45:24",
      lastModifiedDate: "2025-06-21T02:45:24"
    }
  ]
};

export const popularKeywordResponse = {
  page: {
    content: [
      {
        id: "REDACTED",
        keyword: "Máy đặt máy mượn",
        resultType: "LINK",
        linkUrl: "https://muasamcong.mpi.gov.vn/web/guest/contractor-selection?render=index",
        answerContent: null,
        status: 1,
        displayOrder: 3,
        createdDate: "2026-08-14T19:37:58.828",
        updatedDate: "2026-08-14T21:33:55.642"
      }
    ],
    totalPages: 1,
    pageSize: 100,
    currentPage: 1,
    totalElements: 7,
    sort: {
      sorted: true,
      unsorted: false,
      empty: false
    },
    last: true,
    first: true,
    empty: false
  }
};
