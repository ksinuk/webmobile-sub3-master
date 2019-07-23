<template>
  <div>
    <BackBanner>
      <div slot="pageName">
        <p style="font-size: 3rem; font-weight: 300; letter-spacing: 0.08rem; text-shadow: 2px 2px 2px #103b5b; color: white;">Write Portfolio</p>
      </div>
    </BackBanner>
    <!-- 개인정보 수집 -->
    <div>
        <p class="tit">개인정보 수집 및 이용에 대한 동의</p>
        <div class="scrollBox">

            <p>
                1. 개인정보의 수집 및 이용목적<br>
                    - 실명확인 및 본인여부 확인, 포트폴리오 제공,채용정보 안내 및 채용선별 자료 등으로 이용
                </p>
                <br>
                <p>2. 개인정보 수집 항목<br>
                    - 필수항목 <br>
                        개인식별정보 (성명, 생년월일, 비밀번호, 사진 등)<br>
                        기초정보 (희망연봉, 전화번호, 종교, 휴대전화번호, E-mail, 자택주소 등)<br>
                        신상정보 (병역사항, 병역기간, 군별, 계급, 보훈대상여부, 장애대상여부, 미필사유 등)<br>
                        학력정보 (재학기간, 학교, 전공, 졸업여부, 소재지, 성적 등)<br>
                        포트폴리오<br>
                    - 선택항목<br>
                        Git 정보 (Git 주소, 코드 등)<br>
                        홈페이지 정보 (홈페이지 링크 정보, 홈페이지 트래픽 정보)<br>

                </p>
                <br>

                <p>
                3. 개인정보의 보유 및 이용기간<br>
                회사는 개인정보 수집 및 이용목적이 달성된 경우, 개인정보의 수집 및 이용에 대한 동의를 철회하는 경우에는 해당 정보를 지체 없이 파기 합니다.
                </p>
                <br>
                <p>※ 귀하는 상기의 개인정보 수집 및 이용 동의를 거부할 수 있습니다.</p>


        </div>
        <p>
            <input type="checkbox" id="agree1">
            <label for="agree1">개인정보 수집 및 이용에 동의합니다. </label>
        </p>
    </div>
    <WriteForm/>
    <newFooter></newFooter>
  </div>
</template>

<script>
// @ is an alias to /src
import newFooter from '@/components/newFooter.vue'
import BackBanner from '@/components/BackBanner.vue'
import WriteForm from '@/components/WriteForm.vue' 

export default {
  name: 'PortfolioWrite',
  components: {
    WriteForm,
    BackBanner,
    newFooter
  }
}
</script>