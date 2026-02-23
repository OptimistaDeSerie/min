<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="utf-8">
    <title>@yield('title', 'Admin Dashboard')</title>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1">
    <link rel="icon" href="{{ asset('admin/images/favicon.ico') }}">

    <!-- CSS -->
    <link rel="stylesheet" href="{{ asset('admin/css/animate.min.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/css/animation.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/css/bootstrap.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/css/bootstrap-select.min.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/css/style.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/css/custom.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/font/fonts.css') }}">
    <link rel="stylesheet" href="{{ asset('admin/icon/style.css') }}">
    @stack("styles")
</head>

<body class="body">
    <div id="wrapper">
        <div id="page">
            <div class="layout-wrap">

                <!-- Sidebar -->
                <div class="section-menu-left">
                    <div class="box-logo">
                        <a href="{{ url('/secure') }}" id="site-logo-inner">
                            <img id="logo_header" alt="Logo" src="{{ asset('admin/images/logo/logo.png') }}">
                        </a>
                        <div class="button-show-hide">
                            <i class="icon-menu-left"></i>
                        </div>
                    </div>
                    <div class="center">
                        <div class="center-item">
                            <div class="center-heading">Main Menu</div>
                            <ul class="menu-list">
                                <li class="menu-item">
                                    <a href="{{ url('/secure') }}">
                                        <div class="icon"><i class="icon-grid"></i></div>
                                        <div class="text">Dashboard</div>
                                    </a>
                                </li>
                                <li class="menu-item has-children">
                                    <a href="javascript:void(0);" class="menu-item-button">
                                        <div class="icon"><i class="icon-layers"></i></div>
                                        <div class="text">Events</div>
                                    </a>
                                    <ul class="sub-menu">
                                        <li class="sub-menu-item">
                                            <a href="{{ route('admin.events') }}" class="">
                                                <div class="text">All Events</div>
                                            </a>
                                        </li>
                                        <li class="sub-menu-item">
                                            <a href="{{ route('admin.event.add') }}" class="">
                                                <div class="text">Add Event</div>
                                            </a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                <!-- Content -->
                <div class="section-content-right">

                    <!-- Header -->
                    <div class="header-dashboard">
                        <div class="wrap">
                            <div class="header-left">
                                <a href="{{ url('/secure') }}">
                                    <img id="logo_header_mobile" alt="Logo" src="{{ asset('admin/images/logo/logo.png') }}">
                                </a>
                                <div class="button-show-hide">
                                    <i class="icon-menu-left"></i>
                                </div>
                            </div>

                            <div class="header-grid">
                                @guest
                                    <a href="{{ route('login') }}" class="btn btn-primary">
                                        Login
                                    </a>
                                @endguest
                                @auth
                                    <div class="popup-wrap user type-header">
                                        <div class="dropdown">
                                            <button class="btn btn-secondary dropdown-toggle"
                                                    type="button"
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false">
                                                <span class="header-user wg-user">
                                                    <span class="flex flex-column">
                                                        <span class="body-title mb-2">
                                                            {{ auth()->user()->name }}
                                                        </span>
                                                        <span class="text-tiny">
                                                            Admin
                                                        </span>
                                                    </span>
                                                </span>
                                            </button>
                                            <ul class="dropdown-menu dropdown-menu-end has-content">
                                                <li>
                                                    <form method="POST" action="{{ route('logout') }}">
                                                        @csrf
                                                        <button type="submit" class="dropdown-item">
                                                            Log out
                                                        </button>
                                                    </form>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                @endauth
                            </div>
                        </div>
                    </div>

                    <!-- Main Content -->
                    <div class="main-content">
                        <div class="main-content-inner">
                            <div class="main-content-wrap">
                                @yield('content')
                            </div>
                        </div>
                        <div class="bottom-page">
                            <div class="body-text">Copyright © 2026 Made-In Nasarawa Project</div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- JS -->
    <script src="{{ asset('admin/js/jquery.min.js') }}"></script>
    <script src="{{ asset('admin/js/bootstrap.min.js') }}"></script>
    <script src="{{ asset('admin/js/bootstrap-select.min.js') }}"></script>
    <script src="{{ asset('admin/js/sweetalert.min.js') }}"></script>
    <script src="{{ asset('admin/js/apexcharts/apexcharts.js') }}"></script>
    <script src="{{ asset('admin/js/main.js') }}"></script>
    @stack("scripts")
</body>

</html>