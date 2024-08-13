<template>
  <div id="app">
    <main>
      <div class="container">
        <div class="challenge-header">
          <h1 class="challenge-title">{{ challenge.title }}</h1>
          <div class="challenge-meta">
            <span>기간: {{ formatDate(challenge.startTime) }} - {{ formatDate(challenge.endTime) }}</span>
            <span>상태: {{ challenge.conditionStatus }}</span>
          </div>
        </div>

        <div class="challenge-content">
          <div class="main-content">
            <div class="card">
              <img :src="challenge.image" :alt="challenge.title" class="challenge-image">
              <h2>챌린지 소개</h2>
              <p>{{ challenge.content }}</p>
            </div>

            <ChallengeVerifications :verifications="verifications"/>
          </div>

          <div class="challenge-sidebar">
            <div class="card">
              <h2>챌린지 참여하기</h2>
              <button @click="joinChallenge" class="btn btn-primary">지금 참가하기</button>
            </div>

            <div class="card">
              <h2>챌린지 참여자 목록</h2>
              <ul class="participants-list">
                <li v-for="(user, index) in participants" :key="index">
                  {{ user.name }} ({{ user.nickname }})
                </li>
              </ul>
            </div>

            <div class="card">
              <h2>챌린지 인증</h2>
              <h2>TOP3 참여자 </h2>
              <ul class="top-users">
                <li v-for="(topUser, index) in topUsers" :key="index">
                  {{ index + 1 }}등 {{ topUser.name }} ({{ topUser.nickname }})
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import axios from '../axios';
import { mapGetters } from 'vuex';
import ChallengeVerifications from './ChallengeVerification.vue';
import Header from "@/components/Header.vue";
import Footer from "@/components/Footer.vue";

export default {
  name: 'ChallengeContent',
  components: {
    Footer,
    Header,
    ChallengeVerifications
  },
  data() {
    return {
      challenge: {
        title: '',
        startTime: '',
        endTime: '',
        category: '',
        conditionStatus: '',
        completionRate: 0,
        image: '',
        content: '',
        createAt: '',
        participants: 0,
      },
      verifications: [],
      participants: [],
      topUsers: []
    };
  },
  methods: {
    formatDate(dateStr) {
      return dateStr.slice(0, 10);
    },
    fetchChallengeDetails(challengeId) {
      axios.get(`/challenges/${challengeId}`)
      .then(response => {
        this.challenge = response.data.data;
        this.fetchVerifications(challengeId);
        this.fetchParticipants(challengeId);
        this.fetchTop3Users(challengeId);
      })
      .catch(error => {
        console.error('Error fetching challenge details:', error);
      });
    },
    fetchVerifications(challengeId) {
      axios.get(`/challenges/${challengeId}/verifications?page=1`)
      .then(response => {
        this.verifications = response.data.data;
      })
      .catch(error => {
        console.error('Error fetching verifications:', error);
      });
    },
    fetchParticipants(challengeId) {
      axios.get(`/challenges/${challengeId}/users`)
      .then(response => {
        this.participants = response.data.data;
      })
      .catch(error => {
        console.error('Error fetching participants:', error);
      });
    },
    fetchTop3Users(challengeId) {
      axios.get(`/challenges/${challengeId}/verifications/top3users`)
      .then(response => {
        this.topUsers = response.data.data;
      })
      .catch(error => {
        console.error('Error fetching top 3 users:', error);
      });
    },
    async joinChallenge() {
      const challengeId = this.$route.params.challengeId;
      try {
        if (!this.accessToken) {
          await this.$store.dispatch('fetchToken');
        }
        const trimmedToken = this.accessToken.trim();
        const tokenWithBearer = `Bearer ${trimmedToken}`;

        const response = await axios.post(
            `/challenges/${challengeId}`,
            {},
            {
              headers: {
                Authorization: tokenWithBearer
              }
            }
        );
        alert("성공적으로 신청이 완료되었습니다!");
        console.log('챌린지 신청: ', response.data);
        this.$router.go();
      } catch (error) {
        if (error.response) {
          const status = error.response.status;
          if (status === 409) {
            alert('이미 신청하신 챌린지입니다.');
          } else if (status === 400) {
            alert('마감된 챌린지로 참여할 수 없습니다.');
          } else if (status === 500) {
            alert('로그인이 필요합니다.');
          }
        // } else {
        //   alert('서버와의 연결에 문제가 발생했습니다.');
        }
      }
    }
  },
  computed: {
    ...mapGetters(['accessToken'])
  },
  created() {
    const challengeId = this.$route.params.challengeId;
    this.fetchChallengeDetails(challengeId);
  }
};
</script>

<style scoped>

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.challenge-header {
  text-align: center;
  margin-bottom: 2rem;
}

.challenge-title {
  font-size: 2.5rem;
  color: white;
  margin-bottom: 0.5rem;
}

.challenge-meta {
  display: flex;
  justify-content: center;
  gap: 1rem;
  color: rgba(255, 255, 255, 0.8);
}

.challenge-content {
  display: grid;
  grid-template-columns: 3fr 1fr;
  gap: 2rem;
}

.card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  margin-bottom: 1.5rem;
  color: #333;
}

.challenge-image {
  width: 100%;
  height: 400px;
  border-radius: 10px;
  margin-bottom: 1rem;
}

h2 {
  color: #667eea;
  margin-bottom: 1rem;
  text-align: center;
}

.challenge-sidebar {
  position: sticky;
  top: 2rem;
}

.challenge-stats {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
}

.stat-item {
  background-color: #667eea;
  color: white;
  border-radius: 10px;
  padding: 1rem;
  text-align: center;
}

.top-users {
  list-style-type: none;
}

.top-users li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #eee;
}

.button-container {
  display: flex;
  justify-content: center;
}

.btn-primary {
  background-color: #667eea;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  display: block;
  margin: 0 auto;
}

.btn-primary:hover {
  background-color: #5a67d8;
}

</style>