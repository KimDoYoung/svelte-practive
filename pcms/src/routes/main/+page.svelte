<!-- src/routes/main/+page.svelte -->
<script lang="ts">
	import InputYmd from '$lib/components/common/InputYmd.svelte';
	import YoilIcon from '$lib/components/common/YoilIcon.svelte';
    import NavBar from '$lib/components/NavBar.svelte';

    let dateValue = '20241104'; // 초기 값
</script>

<div class="main-area">
    <!-- Main Content -->
    <section class="content">
        <h1>Welcome to the Main Page</h1>
        <p>This is the main content of the page.</p>
    </section>
    <section>
        <div class="grid">
            <YoilIcon ymd="20241104" bgColor="white" textColor="blue" hanja={false} />
            <YoilIcon ymd="20241105" bgColor="#ff0" textColor="#f00" hanja={true} />
            <YoilIcon ymd="20241106" bgColor="#ff0" textColor="#f00" hanja={true} />
            <YoilIcon ymd="20241107" bgColor="#ff0" textColor="#f00" hanja={true} />
            <YoilIcon ymd="20241108" bgColor="#ff0" textColor="#f00" hanja={true} />
            <YoilIcon ymd="20241109" bgColor="#ff0" textColor="#f00" hanja={true} />
        </div>
        <InputYmd bind:ymd={dateValue} />
        {dateValue}
    </section>
</div>

<style>
    .content {
        text-align: center;
        margin-top: 2rem;
    }
</style>
