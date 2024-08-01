<template>
  <div class="container">
    <main class="main-content">
      <header class="header">
        <h1 class="page-title">관리자 챌린지 상세페이지</h1>
        <div class="user-info">
          <span>관리자님, 안녕하세요!</span>
        </div>
      </header>

      <div class="card">
        <div class="card-header">
          <h2 class="card-title">챌린지 정보</h2>
        </div>
        <div class="info-grid">
          <div class="info-item">
            <div class="info-label">챌린지 ID</div>
            <div class="info-value">{{ challengeInfo.challengeId || '데이터 없음' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">챌린지 제목</div>
            <div class="info-value">{{ challengeInfo.title || '데이터 없음' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">카테고리</div>
            <div class="info-value">{{ challengeInfo.category || '데이터 없음' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">챌린지 상태</div>
            <div class="info-value">{{ challengeInfo.conditionStatus || '데이터 없음' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">시작일</div>
            <div class="info-value">{{ formatDate(challengeInfo.startTime) || '데이터 없음' }}</div>
          </div>
          <div class="info-item">
            <div class="info-label">종료일</div>
            <div class="info-value">{{ formatDate(challengeInfo.endTime) || '데이터 없음' }}</div>
          </div>
        </div>
        <div class="challenge-content">
          <p>{{ challengeInfo.content || '데이터 없음' }}</p>
        </div>
      </div>

      <div class="card">
        <div class="card-header">
          <h2 class="card-title">챌린지 인증 요청 목록</h2>
        </div>
        <table>
          <thead>
          <tr>
            <th>유저ID</th>
            <th>인증요청일</th>
            <th>인증사진</th>
            <th>인증제목</th>
            <th>인증상태</th>
            <th>작업</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="record in certificationRecords" :key="record.id">
            <td>{{ record.user }}</td>
            <td>{{ formatDate(record.createdAt) }}</td>
            <td><img :src="record.image" alt="Certification Image" class="certification-image"></td>
            <td>{{ record.title }}</td>
            <td>{{ record.status }}</td>
            <td>
              <button @click="approveRecord(record.verificationId)" class="btn btn-approve" v-if="record.status === 'PENDING'">승인</button>
              <button @click="rejectRecord(record.verificationId)" class="btn btn-reject" v-if="record.status === 'PENDING'">거절</button>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </main>
  </div>
</template>

<script>
import axios from '../axios';

export default {
  data() {
    return {
      challengeInfo: {},
      certificationRecords: [],
    };
  },
  methods: {
    async fetchChallengeDetails() {
      try {
        const challengeId = this.$route.params.challengeId;
        const response = await axios.get(`/admins/challenges/${challengeId}`);

        console.log('API 응답:', response.data);

        if (response.status === 200 && response.data) {
          this.challengeInfo = response.data.data;
        } else {
          console.error('Failed to fetch challenge details:', response.data.msg || 'Unknown error');
        }
      } catch (error) {
        console.error('Error fetching challenge details:', error);
      }
    },
    async fetchCertificationRecords() {
      try {
        const challengeId = this.$route.params.challengeId;
        const response = await axios.get(`/admins/challenges/${challengeId}/verifications`);

        console.log('API 응답:', response.data);

        if (response.status === 200 && response.data) {
          this.certificationRecords = response.data.data;
        } else {
          console.error('Failed to fetch certification records:', response.data.msg || 'Unknown error');
        }
      } catch (error) {
        console.error('Error fetching certification records:', error);
      }
    },
    async approveRecord(id) {
      console.log('Approve Record ID:', id); // 추가된 로그
      try {
        if (!id) {
          console.error('Invalid ID for approval');
          return;
        }
        const response = await axios.put(`/admins/verifications/${id}/approve`);

        if (response.status === 200) {
          console.log('인증 승인 성공:', response.data);
          this.fetchCertificationRecords();
        } else {
          console.error('Failed to approve certification record:', response.data.msg || 'Unknown error');
        }
      } catch (error) {
        console.error('Error approving certification record:', error);
      }
    },
    async rejectRecord(id) {
      console.log('Reject Record ID:', id); // 추가된 로그
      try {
        if (!id) {
          console.error('Invalid ID for rejection');
          return;
        }
        const response = await axios.put(`/admins/verifications/${id}/reject`);

        if (response.status === 200) {
          console.log('인증 거절 성공:', response.data);
          this.fetchCertificationRecords();
        } else {
          console.error('Failed to reject certification record:', response.data.msg || 'Unknown error');
        }
      } catch (error) {
        console.error('Error rejecting certification record:', error);
      }
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString();
    }
  },
  created() {
    this.fetchChallengeDetails();
    this.fetchCertificationRecords();
  }
};
</script>

<style scoped>
/* 스타일 정의 */
body {
  font-family: 'Noto Sans KR', sans-serif;
  background-color: #f7fafc;
  color: #2d3748;
  line-height: 1.6;
}

.container {
  display: flex;
  min-height: 100vh;
}

.logo {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 2rem;
  text-align: center;
}

.main-content {
  flex: 1;
  padding: 2rem;
  overflow-y: auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.page-title {
  font-size: 1.875rem;
  font-weight: 700;
  color: #2d3748;
}

.user-info {
  display: flex;
  align-items: center;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 0.5rem;
}

.card {
  background-color: #ffffff;
  border-radius: 0.5rem;
  padding: 1.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  margin-bottom: 1.5rem;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #2d3748;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
}

.info-item {
  background-color: #f7fafc;
  padding: 1rem;
  border-radius: 0.5rem;
}

.info-label {
  font-size: 0.875rem;
  color: #a0aec0;
  margin-bottom: 0.5rem;
}

.info-value {
  font-size: 1rem;
  font-weight: 500;
  color: #2d3748;
}

.challenge-content {
  margin-top: 1rem;
  line-height: 1.6;
}

table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0 0.5rem;
}

th, td {
  padding: 1rem;
  text-align: left;
}

th {
  background-color: #f7fafc;
  font-weight: 600;
  color: #2d3748;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.05em;
}

tr {
  background-color: #ffffff;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

tr:hover {
  transform: translateY(-2px);
}

.btn {
  background-color: #667eea;
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.875rem;
}

.btn:hover {
  background-color: #764ba2;
}

.btn-approve {
  background-color: #48bb78;
}

.btn-approve:hover {
  background-color: #38a169;
}

.btn-reject {
  background-color: #f56565;
}

.btn-reject:hover {
  background-color: #e53e3e;
}

.certification-image {
  max-width: 100px;
  height: auto;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }
}
</style>
